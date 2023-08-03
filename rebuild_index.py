import os

# Initialize the beginning of the HTML file
html_string = """
<!DOCTYPE html>
<html>
<head>
    <title>Index</title>
    <style>
    #myInput {
      background-image: url('/css/searchicon.png');
      background-position: 10px 10px;
      background-repeat: no-repeat;
      width: 100%;
      font-size: 16px;
      padding: 12px 20px 12px 40px;
      border: 1px solid #ddd;
      margin-bottom: 12px;
    }

    #myUL {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    </style>
    <script>
    function searchFunction() {
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById('myInput');
      filter = input.value.toUpperCase();
      ul = document.getElementById("myUL");
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

<input type="text" id="myInput" onkeyup="searchFunction()" placeholder="Search for links..">
<ul id="myUL">
"""

# Walk through each directory and subdirectory in the current directory
for subdir, dirs, files in os.walk("."):
    for file in files:
        # Check if the file is an index.html file
        if file == "index.html" and subdir != ".":
            # Add a link to the index.html file in the HTML string
            d = os.path.relpath(subdir)
            html_string += f'<li><a href="{os.path.join(subdir, file)}">{d}</a></li>\n'

# Add the ending tags to the HTML string
html_string += """
</ul>
</body>
</html>
"""

# Write the HTML string to the new index.html file
with open("index.html", "w") as f:
    f.write(html_string)
