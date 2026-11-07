function nav_bar (dir) {
  var home = dir.concat("index.html");
  var people = dir.concat("people/people.html");
  var projects = dir.concat("projects/projects.html");
  var news = dir.concat("news/news.html");
  var events = dir.concat("events/events.html");
  var publications = dir.concat("publications/publications.html");
  var credits = dir.concat("credits/credits.html"); 
  
  var output_text = '<ul id="nav"> <li id="nav-home"><a href=' + home + '>Home</a><li id="nav-people"><a href=' + people + '>People</a></li> <li id="nav-projects"><a href=' + projects + '>Projects</a></li> <li id="nav-news"><a href=' + news + '>News</a></li> <li id="nav-events"><a href=' + events + '>Events</a></li> <li id="nav-publications"><a href=' + publications + '>Publications</a></li> <li id="nav-credits"><a href=' + credits + '>Credits</a></li></ul><br>';
  var element = document.getElementById("navbar");
  element.innerHTML = output_text;
}
