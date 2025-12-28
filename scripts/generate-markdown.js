#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const TurndownService = require("turndown");

const INPUT_ROOT = "./www.fallible.com/fallible/comments";
const OUTPUT_ROOT = "./src/posts";

fs.mkdirSync(OUTPUT_ROOT, { recursive: true });

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  emDelimiter: "*"
});

// Keep links clean
turndown.addRule("links", {
  filter: "a",
  replacement(content, node) {
    const href = node.getAttribute("href");
    return href ? `[${content}](${href})` : content;
  }
});

// Escape string for YAML double-quoted strings
// In YAML, backslashes must be escaped unless part of valid escape sequences
function escapeYamlString(str) {
  // Valid YAML escape sequences: \0, \b, \t, \n, \r, \f, \", \\, \/, \uXXXX, \xXX
  // We need to escape backslashes that aren't part of these sequences
  let result = str;
  
  // Process the string character by character to handle escape sequences properly
  let output = "";
  for (let i = 0; i < result.length; i++) {
    if (result[i] === '\\') {
      const nextChar = result[i + 1];
      // Check for valid single-char escapes
      if (nextChar && /[0btnrf"\\/]/.test(nextChar)) {
        output += result[i] + nextChar;
        i++; // Skip next char as it's part of the escape sequence
      }
      // Check for \uXXXX (4 hex digits)
      else if (nextChar === 'u' && /^[0-9a-fA-F]{4}$/i.test(result.substring(i + 2, i + 6))) {
        output += result.substring(i, i + 6);
        i += 5; // Skip \uXXXX
      }
      // Check for \xXX (2 hex digits)
      else if (nextChar === 'x' && /^[0-9a-fA-F]{2}$/i.test(result.substring(i + 2, i + 4))) {
        output += result.substring(i, i + 4);
        i += 3; // Skip \xXX
      }
      // Invalid escape sequence - escape the backslash
      else {
        output += "\\\\";
        // If there's a next char, include it (it will be literal)
        if (nextChar) {
          output += nextChar;
          i++;
        }
      }
    } else {
      output += result[i];
    }
  }
  
  // Then escape quotes
  output = output.replace(/"/g, '\\"');
  return output;
}

// Walk all index.html files
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && entry.name === "index.html") {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  // slug = directory name above index.html
  const slug = path.basename(path.dirname(filePath));
  const outPath = path.join(OUTPUT_ROOT, `${slug}.md`);

  console.log(`Converting ${slug}`);

  const html = fs.readFileSync(filePath, "utf8");
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const blog = doc.querySelector("div#blog");
  if (!blog) {
    console.warn(`  ⚠️  no #blog found, skipping`);
    return;
  }

  // Extract title
  const titleEl = blog.querySelector("h2.title");
  const title = titleEl ? titleEl.textContent.trim() : slug;

  // Remove title from body so it doesn't duplicate
  if (titleEl) titleEl.remove();

  // Extract and parse date from "Posted by [Katy](...) on 10/12/03 at 10:20 PM"
  let date = null;
  const postedEl = blog.querySelector("div.posted");
  if (postedEl) {
    const postedText = postedEl.textContent.trim();
    // Match pattern: "Posted by ... on MM/DD/YY at HH:MM AM/PM"
    const dateMatch = postedText.match(/on\s+(\d{1,2})\/(\d{1,2})\/(\d{2,4})\s+at\s+(\d{1,2}):(\d{2})\s+(AM|PM)/i);
    if (dateMatch) {
      let month = parseInt(dateMatch[1], 10);
      let day = parseInt(dateMatch[2], 10);
      let year = parseInt(dateMatch[3], 10);
      let hour = parseInt(dateMatch[4], 10);
      const minute = parseInt(dateMatch[5], 10);
      const ampm = dateMatch[6].toUpperCase();

      // Convert 2-digit year to 4-digit (assuming 00-50 = 2000-2050, 51-99 = 1951-1999)
      if (year < 100) {
        year = year < 50 ? 2000 + year : 1900 + year;
      }

      // Convert 12-hour to 24-hour
      if (ampm === "PM" && hour !== 12) {
        hour += 12;
      } else if (ampm === "AM" && hour === 12) {
        hour = 0;
      }

      // Format as ISO date string
      date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
    }
    postedEl.remove();
  }

  // Extract comments before removing them
  // Try to find ol.commentlist first, then fall back to any ol
  const commentsList = blog.querySelector("ol.commentlist") || blog.querySelector("ol");
  const comments = [];
  if (commentsList) {
    const commentItems = commentsList.querySelectorAll("li");
    commentItems.forEach(li => {
      // Extract comment author and date if present
      const commentPosted = li.querySelector("div.posted");
      let commentAuthor = null;
      let commentDate = null;
      if (commentPosted) {
        const commentPostedText = commentPosted.textContent.trim();
        const authorMatch = commentPostedText.match(/Posted by\s+([^\s]+)/i);
        if (authorMatch) {
          commentAuthor = authorMatch[1].trim();
        }
        const dateMatch = commentPostedText.match(/on\s+(\d{1,2})\/(\d{1,2})\/(\d{2,4})\s+at\s+(\d{1,2}):(\d{2})\s+(AM|PM)/i);
        if (dateMatch) {
          let month = parseInt(dateMatch[1], 10);
          let day = parseInt(dateMatch[2], 10);
          let year = parseInt(dateMatch[3], 10);
          let hour = parseInt(dateMatch[4], 10);
          const minute = parseInt(dateMatch[5], 10);
          const ampm = dateMatch[6].toUpperCase();

          if (year < 100) {
            year = year < 50 ? 2000 + year : 1900 + year;
          }

          if (ampm === "PM" && hour !== 12) {
            hour += 12;
          } else if (ampm === "AM" && hour === 12) {
            hour = 0;
          }

          commentDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
        }
        // Remove the posted div before converting to markdown
        commentPosted.remove();
      }
      const commentText = turndown.turndown(li.innerHTML).trim();
      if (commentText) {
        comments.push({
          author: commentAuthor,
          date: commentDate,
          text: commentText
        });
      }
    });
    commentsList.remove();
  }

  // Remove pagination text ("Page 1 of 1 pages")
  blog.querySelectorAll(".paginate, .pagecount").forEach(el => el.remove());
  blog.querySelectorAll("div, span, p").forEach(el => {
    const text = el.textContent.trim();
    if (text.match(/^Page \d+ of \d+ pages?$/i)) {
      el.remove();
    }
  });

  // Remove "Next entry..." and "Previous entry..." paragraphs and their container divs
  blog.querySelectorAll("p").forEach(p => {
    const text = p.textContent.trim();
    if (text.startsWith("Next entry:") || text.startsWith("Previous entry:") || text.includes("Back to main")) {
      p.remove();
    }
  });
  // Remove center divs that might contain navigation
  blog.querySelectorAll("div.center").forEach(div => {
    const text = div.textContent.trim();
    if (text.includes("Next entry") || text.includes("Previous entry")) {
      div.remove();
    }
  });

  // Remove "Fallible Comments..." heading and separator
  blog.querySelectorAll("b, hr").forEach(el => {
    const text = el.textContent.trim();
    if (text.includes("Fallible Comments") || el.tagName === "HR") {
      el.remove();
    }
  });

  // Remove "Commenting is not available..." text
  blog.querySelectorAll("*").forEach(el => {
    const text = el.textContent.trim();
    if (text === "Commenting is not available in this weblog entry.") {
      el.remove();
    }
  });

  const markdownBody = turndown.turndown(blog.innerHTML).trim();

  // Build frontmatter
  const frontmatterLines = [`title: "${escapeYamlString(title)}"`];

  if (date) {
    frontmatterLines.push(`date: "${date}"`);
  }

  if (comments.length > 0) {
    frontmatterLines.push("comments:");
    comments.forEach((comment) => {
      frontmatterLines.push(`  - author: "${escapeYamlString(comment.author || "")}"`);
      if (comment.date) {
        frontmatterLines.push(`    date: "${comment.date}"`);
      }
      // Use YAML literal block scalar for multiline text
      const textLines = comment.text.split("\n");
      if (textLines.length === 1) {
        frontmatterLines.push(`    text: "${escapeYamlString(comment.text)}"`);
      } else {
        frontmatterLines.push(`    text: |`);
        textLines.forEach(line => {
          frontmatterLines.push(`      ${line}`);
        });
      }
    });
  }

  const markdown = `---
${frontmatterLines.join("\n")}
---

${markdownBody}
`;

  fs.writeFileSync(outPath, markdown, "utf8");
}

walk(INPUT_ROOT);

