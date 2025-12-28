#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const https = require("https");

const WEBLOG_DIR = "./original-site-mirror/index.php/weblog";
const THROTTLE_MESSAGE = "You have exceeded the allowed page load frequency.";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isThrottleError(content) {
  return content.trim() === THROTTLE_MESSAGE;
}

function isAlreadyFetched(slug) {
  const outputPath = path.join("./original-site-mirror/fallible/comments", slug, "index.html");
  if (!fs.existsSync(outputPath)) {
    return false;
  }
  const content = fs.readFileSync(outputPath, "utf8");
  return !isThrottleError(content);
}

function deleteThrottleErrors() {
  const commentsDir = "./original-site-mirror/fallible/comments";
  if (!fs.existsSync(commentsDir)) {
    return;
  }

  console.log("Cleaning up throttle error files...");
  const entries = fs.readdirSync(commentsDir, { withFileTypes: true });
  let deletedCount = 0;

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexPath = path.join(commentsDir, entry.name, "index.html");
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, "utf8");
        if (isThrottleError(content)) {
          const dirPath = path.join(commentsDir, entry.name);
          fs.rmSync(dirPath, { recursive: true, force: true });
          console.log(`Deleted ${dirPath}`);
          deletedCount++;
        }
      }
    }
  }

  if (deletedCount > 0) {
    console.log(`Deleted ${deletedCount} throttle error directories`);
  } else {
    console.log("No throttle error files found");
  }
}

function fetchSlug(slug) {
  return new Promise((resolve, reject) => {
    const url = `https://www.fallible.com/fallible/comments/${slug}/`;
    const outputDir = path.join("./original-site-mirror/fallible/comments", slug);
    const outputPath = path.join(outputDir, "index.html");

    // Create output directory if it doesn't exist
    fs.mkdirSync(outputDir, { recursive: true });

    function fetchUrl(urlToFetch) {
      console.log(`Fetching ${urlToFetch}...`);

      https.get(urlToFetch, (res) => {
        let html = "";

        // Handle redirects
        if (res.statusCode === 301 || res.statusCode === 302) {
          const redirectUrl = res.headers.location;
          console.log(`Redirecting to ${redirectUrl}`);
          return fetchUrl(redirectUrl);
        }

        if (res.statusCode !== 200) {
          console.error(`Error: Received status code ${res.statusCode} for ${slug}`);
          return reject(new Error(`Status code ${res.statusCode}`));
        }

        res.on("data", (chunk) => {
          html += chunk;
        });

        res.on("end", () => {
          // Check for throttle error
          if (isThrottleError(html)) {
            console.error(`Throttle error detected for ${slug}`);
            // Don't save, reject with special error
            return reject(new Error("THROTTLE_ERROR"));
          }

          fs.writeFileSync(outputPath, html, "utf8");
          console.log(`Saved to ${outputPath}`);
          resolve();
        });
      }).on("error", (err) => {
        console.error(`Error fetching ${urlToFetch}:`, err.message);
        reject(err);
      });
    }

    fetchUrl(url);
  });
}

async function main() {
  const slug = process.argv[2];
  const cleanup = process.argv[2] === "--cleanup";

  if (cleanup) {
    // Cleanup mode
    deleteThrottleErrors();
    return;
  }

  if (slug) {
    // Single slug mode
    try {
      await fetchSlug(slug);
    } catch (err) {
      if (err.message === "THROTTLE_ERROR") {
        console.error("Throttle error detected. Stopping.");
      } else {
        console.error(`Failed to fetch ${slug}:`, err.message);
      }
      process.exit(1);
    }
  } else {
    // Iterate over all directories in weblog
    // Clean up any existing throttle errors first
    deleteThrottleErrors();
    console.log();

    console.log(`Reading directories from ${WEBLOG_DIR}...`);
    const entries = fs.readdirSync(WEBLOG_DIR, { withFileTypes: true });
    const allSlugs = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);

    // Filter out already fetched slugs
    const slugs = allSlugs.filter(s => !isAlreadyFetched(s));
    const skippedCount = allSlugs.length - slugs.length;

    if (skippedCount > 0) {
      console.log(`Skipping ${skippedCount} already fetched slugs`);
    }
    console.log(`Found ${slugs.length} slugs to fetch`);
    
    for (let i = 0; i < slugs.length; i++) {
      const currentSlug = slugs[i];
      console.log(`\n[${i + 1}/${slugs.length}] Processing ${currentSlug}...`);
      
      try {
        await fetchSlug(currentSlug);
      } catch (err) {
        if (err.message === "THROTTLE_ERROR") {
          console.error("Throttle error detected. Stopping.");
          break;
        } else {
          console.error(`Failed to fetch ${currentSlug}:`, err.message);
          // Continue with next slug instead of exiting
        }
      }

      // Pause 3 seconds between requests (except after the last one)
      if (i < slugs.length - 1) {
        console.log("Waiting 3 seconds before next request...");
        await sleep(3000);
      }
    }

    console.log("\nDone!");
  }
}

main();

