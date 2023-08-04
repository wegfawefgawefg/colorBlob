import os
from pprint import pprint

base_file = "indexbase.html"
output = "index.html"

# open the base file
with open(base_file, "r") as f:
    base = f.read()

# split at <!-- STATIC_INJECTION -->
base_parts = base.split("<!-- STATIC_INJECTION -->")
pprint(base_parts)
print(len(base_parts))
html = base_parts[0] + "\n"

# Walk through each directory and subdirectory in the current directory
for subdir, dirs, files in os.walk("."):
    dirs.sort()
    files.sort()
    for file in files:
        # Check if the file is an index.html file
        if file == "index.html" and subdir != ".":
            # Add a link to the index.html file in the HTML string
            d = os.path.relpath(subdir)
            html += f'<li><a href="{os.path.join(subdir, file)}">{d}</a></li>\n'

html += base_parts[1]

# Write the HTML string to the new index.html file
with open("index.html", "w") as f:
    f.write(html)
