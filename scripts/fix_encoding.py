#!/usr/bin/env python3
"""
Fix double-encoded UTF-8 text in markdown files.

Root cause: original UTF-8 bytes (smart quotes, em dashes, etc.) were decoded
as cp1252, producing mojibake like "â€œ" instead of '"'. Those characters
were then re-encoded as UTF-8, embedding C1 control code points (U+0080-U+009F)
which js-yaml rejects as non-printable.

Fix: scan for high-latin characters (0xC0-0xFF) that, when encoded back as
cp1252 bytes, form valid UTF-8 sequences. Replace them with the correct character.
"""

import sys
import glob
import os


def fix_mojibake(text):
    result = []
    i = 0
    n = len(text)

    while i < n:
        ch = text[i]
        cp = ord(ch)

        # Only attempt fix for chars in the 0xC0-0xFF range — these correspond
        # to lead bytes 0xC0-0xFF of the original UTF-8 sequence, decoded via cp1252.
        if 0xC0 <= cp <= 0xFF:
            fixed = False
            for seq_len in [4, 3, 2]:
                if i + seq_len > n:
                    continue
                seq = text[i : i + seq_len]
                try:
                    raw = bytearray()
                    for c in seq:
                        cp2 = ord(c)
                        if 0x80 <= cp2 <= 0x9F:
                            # C1 control — undefined in cp1252, maps back to raw byte
                            raw.append(cp2)
                        else:
                            raw.extend(c.encode("cp1252"))
                    decoded = raw.decode("utf-8")
                    # Accept only if we get a single non-C1 printable character
                    if len(decoded) == 1 and not (0x80 <= ord(decoded) <= 0x9F):
                        result.append(decoded)
                        i += seq_len
                        fixed = True
                        break
                except (UnicodeDecodeError, UnicodeEncodeError):
                    continue
            if not fixed:
                result.append(ch)
                i += 1
        else:
            result.append(ch)
            i += 1

    return "".join(result)


def has_c1_controls(text):
    return any(0x80 <= ord(c) <= 0x9F for c in text)


def fix_file(path):
    with open(path, "r", encoding="utf-8") as f:
        original = f.read()

    if not has_c1_controls(original):
        return False

    fixed = fix_mojibake(original)

    if fixed == original:
        return False

    with open(path, "w", encoding="utf-8") as f:
        f.write(fixed)

    return True


if __name__ == "__main__":
    pattern = sys.argv[1] if len(sys.argv) > 1 else "src/posts/*.md"
    paths = sorted(glob.glob(pattern))
    fixed_count = 0
    for path in paths:
        if fix_file(path):
            fixed_count += 1
            print(f"Fixed: {path}")
    print(f"\nFixed {fixed_count} of {len(paths)} files.")
