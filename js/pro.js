// Projects rendering for SEAL Lab website
// Data is loaded from data/projects.js which defines projectsData global

function shuffle(display_string) {
  var a = display_string.split("!"),
      n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    if (!(a[i].includes("Other projects"))) {
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
  }
  return a.join("");
}

function project(projects, name) {
  var display_string = "";
  if (name != "") {
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].owners == name) {
        display_string += "!<li><a href='" + projects[i].pagelink + "'>" + projects[i].title + "</a></li>";
      }
    }
    return display_string + "</ol>";
  }
  else {
    for (var i = 0; i < projects.length; i++) {
      display_string += "!<li><a href='" + projects[i].pagelink + "'>" + projects[i].title + "</a></li>";
    }
    return display_string;
  }
}

function projects(name) {
  var element = document.getElementById("projects");
  
  // projectsData is defined in data/projects.js (loaded before this script)
  if (typeof projectsData === 'undefined' || !projectsData) {
    element.innerHTML = '<div class="error" style="color: #721c24; background-color: #f8d7da; padding: 10px; border-radius: 4px;">Projects data not loaded. Please ensure data/projects.js is included before this script.</div>';
    return;
  }

  var output_text = project(projectsData.projects, name);
  output_text = shuffle(output_text);
  element.innerHTML = output_text;
}
