import os

# Initialize the beginning of the HTML file
html_string = """
<!DOCTYPE html>
<html>
<head>
    <title>DR Toys Index</title>
    <link rel="stylesheet" href="style.css">
    <script>
    function searchFunction() {
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById('search');
      filter = input.value.toUpperCase();
      ul = document.getElementById("mainul");
      li = ul.getElementsByTagName('li');
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }
    </script>

</head>
<body>
<div id="searchable_index">
  <h1>DR Toys Index</h1>
  <input type="text" id="search" onkeyup="searchFunction()" placeholder="filter toys...">
  <ul id="mainul">
"""

# Walk through each directory and subdirectory in the current directory
for subdir, dirs, files in os.walk("."):
    dirs.sort()
    files.sort()
    for file in files:
        # Check if the file is an index.html file
        if file == "index.html" and subdir != ".":
            # Add a link to the index.html file in the HTML string
            d = os.path.relpath(subdir)
            html_string += f'<li><a href="{os.path.join(subdir, file)}">{d}</a></li>\n'

# Add the ending tags to the HTML string
html_string += """
</ul>
</div>
</body>
</html>
"""

# Write the HTML string to the new index.html file
with open("index.html", "w") as f:
    f.write(html_string)
