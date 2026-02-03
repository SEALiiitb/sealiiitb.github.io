// Publications rendering for SEAL Lab website
// Data is loaded from data/publications.js which defines publicationsData global

function findAuthor(authors, name) {
  for (var i in authors) {
    if (authors[i].name == name) {
      return i;
    }
  }
  return -1;
}

function stringOfAuthors(authors, mainAuthor) {
  var text = authors.map(function (author) {
    if (author.name == mainAuthor) {
      return "<b>" + author.name + "</b>, ";
    }
    else {
      return author.name + ", ";
    }
  }).reduce(function (s1, s2) { return s1 + s2; }, "");

  return text.substring(0, text.length - 2);
}

function string_of_publication(str_pub, pub_type, func, name) {
  return "<h3>" + str_pub + "</h3><ol>" +
    pub_type.filter(
      function (x) { return name == "" || findAuthor(x.authors, name) != -1; }
    ).sort(function (x, y) { return x.year < y.year; }).map(func)
      .reduce(function (s1, s2) { return s1 + s2; }, "") + "</ol>";
}

// function that constructs the links for the preprint and online version of the paper.
function preprint_online(x) {
  var preprint = "";
  var online = "";
  if (x.preprint != "") {
    preprint = "&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"" + x.preprint + "\">Preprint</a>";
  }
  if (x.online != "") {
    online = "&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"" + x.online + "\">Online</a>";
  }
  return [preprint, online];
}

function journal(journals, name) {
  return string_of_publication("Journal", journals,
    function (x) {
      var value = preprint_online(x);
      var preprint = value[0];
      var online = value[1];
      return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
        "</i>, " + x.name + ", " + x.issue + " " + x.year + preprint + online + "</li>";
    }
    , name);
}

function conference(conferences, name) {
  return string_of_publication("Conference", conferences,
    function (x) {
      var value = preprint_online(x);
      var preprint = value[0];
      var online = value[1];
      if (x.venue != "")
        return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
          "</i>, " + x.name + ", " + x.venue + ", " + x.year + preprint + online + "</li>";
      else return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
        "</i>, " + x.name + ", " + x.year + preprint + online + "</li>";
    }
    , name);
}

function workshop(workshops, name) {
  return string_of_publication("Workshop", workshops,
    function (x) {
      var value = preprint_online(x);
      var preprint = value[0];
      var online = value[1];
      if (x.venue != "")
        return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
          "</i>, " + x.name + ", " + x.venue + ", " + x.year + preprint + online + "</li>";
      else return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
        "</i>, " + x.name + ", " + x.year + preprint + online + "</li>";
    }
    , name);
}

function techrep(techreps, name) {
  return string_of_publication("Technical Reports", techreps,
    function (x) {
      var value = preprint_online(x);
      var preprint = value[0];
      var online = value[1];
      return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
        "</i>, " + x.year + preprint + online + "</li>";
    }
    , name);
}

function pubs(name) {
  var element = document.getElementById("pubs");
  
  // publicationsData is defined in data/publications.js (loaded before this script)
  if (typeof publicationsData === 'undefined' || !publicationsData) {
    element.innerHTML = '<div class="error" style="color: #721c24; background-color: #f8d7da; padding: 10px; border-radius: 4px;">Publications data not loaded. Please ensure data/publications.js is included before this script.</div>';
    return;
  }

  var output_text = journal(publicationsData.journal, name) + 
                    conference(publicationsData.conference, name) + 
                    workshop(publicationsData.workshop, name) + 
                    techrep(publicationsData.technical_report, name);

  element.innerHTML = output_text;
}
