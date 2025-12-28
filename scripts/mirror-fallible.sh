mkdir fallible-mirror
cd fallible-mirror


wget \
  --recursive \
  --no-parent \
  --domains fallible.com \
  --page-requisites \
  --html-extension \
  --convert-links \
  --restrict-file-names=windows \
  --execute robots=off \
  --directory-prefix=. \
  http://fallible.com/

