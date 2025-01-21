function findAuthor(authors, name) {
  for(var i in authors) {
    if(authors[i].name == name) {
      return i;
    }
  }
  return -1;
}

function stringOfAuthors(authors, mainAuthor) {
  var text = authors.map(function(author) { 
	    if(author.name == mainAuthor) { 
		    return "<b>" + author.name + "</b>, ";
	    }
	    else {
		  return author.name + ", ";
	    } 
	  }).reduce(function(s1, s2) { return s1 + s2; } , "");

  return text.substring(0, text.length - 2);
}

function string_of_publication (str_pub, pub_type, func, name) {
  return "<h3>" + str_pub + "</h3><ol>" +
   pub_type.filter(
     function(x) {  return name == "" || findAuthor(x.authors, name) != -1; }
   ).sort(function(x, y) { return x.year < y.year; }).map(func)
  .reduce(function(s1, s2) { return s1 + s2; } , "") + "</ol>";
}

// function that constructs the links for the preprint and online version of the paper.
function preprint_online(x) {
  var preprint = "";
  var online   = "";
  if(x.preprint != "") {
    preprint = "&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"" + x.preprint + "\">Preprint</a>";
  }
  if(x.online != "") {
    online = "&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"" + x.online + "\">Online</a>";
  }
  return [preprint, online]; 
}

function journal(journals, name) {
  return string_of_publication("Journal", journals,
    function(x) {
      var value = preprint_online(x);
      var preprint = value[0];
      var online   = value[1];
      return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
        "</i>, " + x.name + ", " + x.issue + " " + x.year + preprint + online + "</li>";
    }
    , name);
}

function conference(conferences, name) {
  return string_of_publication("Conference", conferences,
    function(x) {
      var value = preprint_online(x);
      var preprint = value[0];
      var online   = value[1];
      if(x.venue!="")
      return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
        "</i>, " + x.name + ", " + x.venue + ", " + x.year + preprint + online + "</li>";
      else return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
        "</i>, " + x.name + ", " + x.year + preprint + online + "</li>";
    }
    , name);
}

function workshop(workshops, name) {
  return string_of_publication("Workshop", workshops,
    function(x) {
      var value = preprint_online(x);
      var preprint = value[0];
      var online   = value[1];
      if(x.venue!="")
    	  	return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
        "</i>, " + x.name + ", " + x.venue + ", " + x.year +  preprint + online + "</li>";
      else return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
      "</i>, " + x.name + ", " + x.year + preprint + online + "</li>";
    }
    , name);
}

function techrep(techreps, name) {
  return string_of_publication("Technical Reports", techreps,
    function(x) {
      var value = preprint_online(x);
      var preprint = value[0];
      var online   = value[1];
      return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper +
        "</i>, " + x.year + preprint + online + "</li>";
    }
    , name);
}

function pubs (name) {

  var allpubs = { 
    "conference" : [
      {
        "paper" : "LetGrade: An Automated Grading System for Programming Assignments",
        "authors" : [
          {"name" :"Sujit Kumar Chakrabarti"},
          {"name" :"Nikhila K.N."}
         ],
         "name" : "International Conference on Artificial Intelligence in Education",
         "venue" : "Durham, UK",
         "date" : "July",
         "year" : "2022",
         "preprint" : "../preprints/AIED2022_Poster.pdf",
         "online" : "https://link.springer.com/chapter/10.1007/978-3-031-11647-6_75"
      },
      {
        "paper" : "Towards Automatic Training Design",
        "authors" : [
          {"name" :"Sujit Kumar Chakrabarti"}
         ],
         "name" : "MITE 2016",
         "venue" : "Madurai, INDIA",
         "date" : "December",
         "year" : "2016",
         "preprint" : "../preprints/training-design.pdf",
         "online" : ""
      },
      {
        "paper" : "SymTest : A Framework for Symbolic Testing of Embedded Software",
        "authors" : [
          {"name" :"Sujit Kumar Chakrabarti"},
          {"name" :"Ramesh S."}
         ],
         "name" : "ISEC 2016",
         "venue" : "Goa, INDIA",
         "date" : "February",
         "year" : "2016",
         "preprint" : "../preprints/symtest.pdf",
         "online" : "http://dl.acm.org/citation.cfm?id=2856642"

      },
      {
        "paper" : "Test-the-REST: An Approach to Testing RESTful Web-services",
        "authors" : [
          {
            "name" : "Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Prashant Kumar"
          }
        ],
        "name" : "ISEC 2010",
        "venue" : "Mysore, INDIA",
        "date" : "February",
        "year" : "2016",
         "preprint" : "",
         "online" : "http://ieeexplore.ieee.org/abstract/document/5359602/"

      },
      {
        "paper" : "Using Spreadsheets for Finite State Modelling",
        "authors" : [
          {
            "name" : "Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Srihari Sukumaran"
          }
        ],
        "name" : "ISEC 2009",
        "venue" : "Pune, INDIA",
        "date" : "February",
        "year" : "2016",
         "preprint" : "",
         "online" : "http://dl.acm.org/citation.cfm?id=1506223"

      },
      {
        "paper" : "Web Services Testing: New Challenges, New Approaches",
        "authors" : [
          {
            "name" : "Sukanta Bhatt"
          },
          {
            "name" : "Sujit Kumar Chakrabarti"
          }
        ],
        "name" : "STeP-IN Summit",
        "venue" : "Bangalore, INDIA",
        "date" : "February",
        "year" : "2010",
         "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Software Reliability Prediction in Philips Healthcare -- An Experience Report",
        "authors" : [
          {
            "name" : "Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Prashant Kumar"
          }
        ],
        "name" : "ISSRE",
        "venue" : "Mysore, INDIA",
        "date" : "2009",
        "year" : "2009",
         "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Test Sequence Computation for Regression Testing of Reactive Systems",
        "authors" : [
          {
            "name" : "Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Y. N. Srikant"
          }
        ],
        "name" : "ISEC 2008",
        "venue" : "Hyderabad, INDIA",
        "date" : "February",
        "year" : "2008",
         "preprint" : "",
         "online" : "http://dl.acm.org/citation.cfm?doid=1342211.1342238"

      },
      {
        "paper" : "Specification Based Regression Testing using Explicit State Space Enumeration",
        "authors" : [
          {
            "name" : "Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Y. N. Srikant"
          }
        ],
        "name" : "ICSEA 2006",
        "venue" : "Tahiti, French Polynesia",
        "date" : "",
        "year" : "2006",
         "preprint" : "",
         "online" : "http://ieeexplore.ieee.org/document/4031805/"

      },
      {
         "paper" : "Connectedness Testing of RESTful Web-Services",
         "authors" : [
           {
             "name" : "Sujit Kumar Chakrabarti"
           },
           {
             "name" : "Reswin Rodriquez"
           }
         ],
         "name" : "ISEC 2010",
         "venue" : "Mysore, INDIA",
         "date" : "February",
         "year" : "2010",
         "preprint" : "",
         "online" : "http://dl.acm.org/citation.cfm?id=1730902"

      },
      {
         "paper" : "Formal verification of avionics self-adaptive software",
         "authors" : [
           {
             "name" : "Rajanikanth N. Kashi"
           },
           {
             "name" : "Meenakshi D'Souza"
           },
           {
             "name" : "S Kumar Baghel"
           },
           {
             "name" : "Nitin Arun Kulkarni"
           }

         ],
         "name" : "ISEC 2016",
         "venue" : "Goa, INDIA",
         "date" : "February",
         "year" : "2016",
         "preprint" : "",
         "online" : ""

      },
      {
         "paper" : "A Robust and Scalable Architecture for Airborne Radar Simulation",
         "authors" : [
           {
             "name" : "Rajanikanth N. Kashi"
           },
           {
             "name" : "Y Narahari"
           },
           {
             "name" : "N N S S R K Prasad"
           },
           {
             "name" : "R S Rao"
           }

         ],
         "name" : "IEEE Region 10 Technical Conference on Convergent Technologies For The Asia-Pacific",
         "venue" : "Bangalore, India",
         "date" : "October",
         "year" : "2003",
         "preprint" : "",
         "online" : ""

      },
      {
         "paper" : "A Robust Design of Airborne Radar Simulation Software using design patterns",
         "authors" : [
           {
             "name" : "Rajanikanth N. Kashi"
           },
           {
             "name" : "Y Narahari"
           },
           {
             "name" : "N N S S R K Prasad"
           },
           {
             "name" : "R S Rao"
           }

         ],
         "name" : "National Conference on Object Oriented Technology 2003 (NCOOT 2003)",
         "venue" : "Lonere, Maharastra, India",
         "date" : "August",
         "year" : "2003",
         "preprint" : "",
         "online" : ""

      },
      {
         "paper" : "Airborne Radar Data Processor Simulation Using Software In The-Loop Model",
         "authors" : [
           {
             "name" : "Rajanikanth N. Kashi"
           },
           {
             "name" : "Y Narahari"
           },
           {
             "name" : "N N S S R K Prasad"
           },
           {
             "name" : "R S Rao"
           }

         ],
         "name" : "International Radar Symposium India",
         "venue" : "Bangalore, India",
         "date" : "December",
         "year" : "2003",
         "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Specifying and Constructing Safety-Critical Real-time Systems using TAU",
        "authors" : [
          {
            "name" : "Rajanikanth N. Kashi"
          },
          {
            "name" :"Charles Law"
          },
          {
            "name" :"Gary Spence"
          },
          {
            "name" :"Greg Lacefield"
          },
          {
            "name" :"Nainatara Kumble"
          }
        ],
        "name" : "Telelogic User Group Conference",
        "venue" : "Miami, Florida, USA",
        "date" : "October",
        "year" : "2004",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Perspectives on the use of Model Based Development Approach For Safety Critical Avionics Software Development",
        "authors" : [
          {
            "name" : "Rajanikanth N. Kashi"
          },
          {
            "name" :"Mohandas Amarnathan"
          }
        ],
        "name" : "International Conference on Aerospace Science and Technology (INCAST) 2008",
        "venue" : "National Science Seminar Complex IISc, Bangalore, India",
        "date" : "",
        "year" : "2008",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Architectural Semantics of AADL using Event-B",
        "authors" : [
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" :"Manoranjan Satpathy"
          },
          {
            "name" :"Ramesh S."
          }
        ],
        "name" : "IEEE International Conference on Computing, Communication and Information Technology (IC3I)",
        "venue" : "",
        "date" : "",
        "year" : "2014",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Verification of Message Sequence Structures",
        "authors" : [
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" :"Teodor Knapik"
          }
        ],
        "name" : "International Conference on Distributed Computing and Internet Technology (ICDCIT)",
        "venue" : "171-182, LNCS 7753, Springer",
        "date" : "",
        "year" : "2013",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Improving estimation accuracy by using Case Based Reasoning and a combined estimation approach",
        "authors" : [
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" :"Srinivasa Gopal"
          }
        ],
        "name" : "ACM, India Software Engineering Conference (ISEC)",
        "venue" : "Kanpur, India",
        "date" : "",
        "year" : "2012",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "A framework for decentralized access control",
        "authors" : [
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" :"Abhishek Bhatnagar"
          },
          {
            "name" :"Namit Chaturvedi"
          },
          {
            "name" :"Atish Datta Chowdhury"
          },
          {
            "name" :"Arul Ganesh"
          }
        ],
        "name" : "ACM Conference on Computer and Communications Security (ASIACCS)",
        "venue" : "",
        "date" : "",
        "year" : "2007",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Formal safety analysis of mode transitions in aircraft flight control system",
        "authors" : [
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" :"Kuntal Das Barman"
          },
          {
            "name" :"Ganesh Babu Kandhan"
          },
          {
            "name" :"Karan Sehgal"
          }
        ],
        "name" : "26th IEEE Digital Avionics Systems Conference (DASC)",
        "venue" : "",
        "date" : "",
        "year" : "2007",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Tool for Translating Simulink Models into Input Language of a Model Checker",
        "authors" : [
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" :"Abhishek Bhatnagar"
          },
          {
            "name" :"Sudeepa Roy"
          }
        ],
        "name" : "8th International Conference on Formal Engineering Methods (ICFEM)",
        "venue" : "LNCS, Volume No. 4260, 606-620",
        "date" : "",
        "year" : "2006",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "A framework for rapid-prototyping of context based ubiquitous computing applications",
        "authors" : [
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" :"Namit Chaturvedi"
          },
          {
            "name" :"Atish Datta Chowdhury"
          },
          {
            "name" :"Arul Ganesh"
          }
        ],
        "name" : "IEEE International Conference on Sensor networks, Ubiquitous and Trustworthy Computing (SUTC)",
        "venue" : "306-311",
        "date" : "",
        "year" : "2006",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Reasoning about Layered Message Passing Systems",
        "authors" : [
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" :"Ramaswamy Ramanujam"
          }
        ],
        "name" : "4th International Conference on Verification, Model Checking and Abstract Interpretation (VMCAI)",
        "venue" : "LNCS, Volume No. 2575, 268-282, 2003",
        "date" : "",
        "year" : "2003",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Beyond Message Sequence Graphs",
        "authors" : [
          {
            "name" :"P. Madhusudan"
          },
          {
            "name" : "Meenakshi D'Souza"
          }
        ],
        "name" : "21st Foundations of Software Technology and Theoretical Computer Science (FSTTCS) Conference",
        "venue" : "LNCS, Volume No. 2245, 256-267",
        "date" : "",
        "year" : "2001",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Reasoning about Message Passing in Finite State Environments",
        "authors" : [
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" :"Ramaswamy Ramanujam"
          }
        ],
        "name" : "27th International Colloquium on Automata, Lauguages and Programming (ICALP)",
        "venue" : "LNCS, Volume No.1853, 487-498",
        "date" : "",
        "year" : "2000",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Safety Validation of an Embedded Real-time System at Hardware-Software Integration Test Environment",
        "authors" : [
          {
            "name" :"Gracy Philip"
          },
          {
            "name" : "Meenakshi D'Souza"
          }
        ],
        "name" : "9th Intl. Conf. on Advanced Computing and Communication Technologies",
        "venue" : "Springer Advances in Intelligent System and Computing Series",
        "date" : "",
        "year" : "2015",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Incorporating Adaptivity using Learning in Avionics Self Adaptive Software: A Case Study",
        "authors" : [
          {
            "name" :"Rajanikanth N. Kashi"
          },
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" :"S Kumar Baghel"
          },
          {
            "name" :"Nitin Arun Kulkarni"
          }
          
        ],
        "name" : "5th International Conference on Computing, Communications and Informatics (ICACCI 2016)",
        "venue" : "Jaipur, INDIA",
        "date" : "",
        "year" : "2016",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "A systematic and effective method of mechanizing Allocation in system modeling of Aircraft Navigation Products using SysML",
        "authors" : [
          {
            "name" :"Rajanikanth N. Kashi"
          },
          {
            "name" : "Perumal Kumar"
          }
        ],
        "name" : "National Conference on Emerging Technologies in Computer Science 2010 (NCETCS-2010)",
        "venue" : "Bangalore, INDIA",
        "date" : "",
        "year" : "2010",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Improving the Kinetics and Effectiveness of Systems Engineering - Perspectives on Integrated use of SysML, AADL, and UML for Aircraft Navigation Product Lines",
        "authors" : [
          {
            "name" :"Rajanikanth N. Kashi"
          },
          {
            "name" : "Perumal Kumar"
          },
          {
            "name" : "Vanathi Ravindran"
          }
        ],
        "name" : "4th Asia-Pacific Conference on Systems Engineering (APCOSE 2010)",
        "venue" : "National Taiwan Ocean University, Keelung, TAIWAN",
        "date" : "",
        "year" : "2010",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "The Modeling and Analysis of Aircraft In-Trail Procedures Using SysML",
        "authors" : [
          {
            "name" :"Rajanikanth N. Kashi"
          },
          {
            "name" : "Fernandes Cercuncesao"
          },
          {
            "name" : "Prabhu Kota"
          }
        ],
        "name" : "5th Asia-Pacific Conference on Systems Engineering (APCOSE 2011)",
        "venue" : "SOUTH KOREA",
        "date" : "October",
        "year" : "2011",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Perspectives on Lean Systems Engineering in Avionics Product Development",
        "authors" : [
          {
            "name" :"Rajanikanth N. Kashi"
          },
          {
            "name" : "Nainatara Kumble"
          },
          {
            "name" : "Muralikrishna Sampath"
          }
        ],
        "name" : "5th Asia-Pacific Conference on Systems Engineering (APCOSE 2011)",
        "venue" : "SOUTH KOREA",
        "date" : "October",
        "year" : "2011",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Design of a Power Aware Methodology in IoT based on Hidden Markov Model",
        "authors" : [
          {
            "name" :"Palani Kumar Subramanian"
          },
          {
            "name" : "Meenakshi D'Souza"
          }
        ],
        "name" : "Proceedings of COMSNETS-17",
        "venue" : "INDIA",
        "date" : "",
        "year" : "2017",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Static Vulnerability Analysis for Secure Mobile Platforms",
        "authors" : [
          {
            "name" :"Dhinakar Kalyanasundaram"
          },
          {
            "name" : "Meenakshi D'Souza"
          }
        ],
        "name" : "Innovations in Software Engineering Conference (ISEC) 2017",
        "venue" : "Jaipur, INDIA",
        "date" : "",
        "year" : "2017",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Knowledge Based Decision Framework For Architecting Complex Systems",
        "authors" : [
          {
            "name" :"Ramakrishnan Raman"
          },
          {
            "name" : "Meenakshi D'Souza"
          }
        ],
        "name" : "32nd ACM Symposium on Applied Computing – ACM SAC 2017",
        "venue" : "Marrakech, Morocco",
        "date" : "April 03-06",
        "year" : "2017",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Automatic Generation of Safety Validation Test cases from System Architecture Fault Trees",
        "authors" : [
          {
            "name" :"Gracy Philip"
          },
          {
            "name" : "Meenakshi D'Souza"
          },
	  {
            "name" : "Varsha P. Suresh"
          }
        ],
        "name" : "ACM, India Software Engineering Conference (ISEC)",
        "venue" : "Hyderabad, India",
        "date" : "9th - 11th February",
        "year" : "2018",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Efficient Anomaly Detection Method for Power Saving in massive IoT architectures",
        "authors" : [
          {
            "name" :"Palani Kumar"
          },
          {
            "name" : "Meenakshi D'Souza"
          },
	  {
            "name" : "Debabrata Das"
          }
        ],
        "name" : "ICDCIT, LNCS 10772, Springer",
        "venue" : "",
        "date" : "",
        "year" : "2018",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "A static analyzer for industrial robotic applications",
        "authors" : [
          {
            "name" :"Avijit Mandal"
          },
          {
            "name" : "Raoul Jetley"
          },
          {
            "name" : "Meenakshi D'Souza"
          },
	  {
            "name" : "Sreeja S Nair"
          }
        ],
        "name" : "28th IEEE ISSRE",
        "venue" : "Toulouse, France",
        "date" : "",
        "year" : "2017",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "A framework for modelling and verifying IoT communication protocols",
        "authors" : [
          {
            "name" :"Maithily Diwan"
          },
          {
            "name" : "Meenakshi D'Souza"
          }
        ],
        "name" : "SETTA 2017, Springer LNCS 10606, pages 266-280",
        "venue" : "China",
        "date" : "",
        "year" : "2017",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Method level power estimation and optimization in next generation smart phones",
        "authors" : [
          {
            "name" :"Hilam Patel"
          },
          {
            "name" : "Meenakshi D'Souza"
          },
	  {
            "name" : "Nagesh Tikare"
          }
        ],
        "name" : "IEEE ICACCI 2017, 1010-1016",
        "venue" : "",
        "date" : "",
        "year" : "2017",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Model-based safety analysis: Automatic generation of safety validation test cases",
        "authors" : [
          {
            "name" :"Gracy Philip"
          },
          {
            "name" : "Meenakshi D'Souza"
          },
	  {
            "name" : "V. P. Abidha"
          }
        ],
        "name" : "in 36th IEEE/AIAA Digital Avionics Systems Conference (DASC)",
        "venue" : "Florida",
        "date" : "September",
        "year" : "2017",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Knowledge based decision model for architecting and evolving complex system-of-systems",
        "authors" : [
          {
            "name" :"Ramakrishnan Raman"
          },
          {
            "name" : "Meenakshi D'Souza"
          }
        ],
        "name" : "INCOSE International Symposium, 27(1)",
        "venue" : "Wiley",
        "date" : "July",
        "year" : "2017",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Knowledge value stream framework for architecting complex products",
        "authors" : [
          {
            "name" :"Ramakrishnan Raman"
          },
          {
            "name" : "Meenakshi D'Souza"
          }
        ],
        "name" : "IEEE Technology and Engineering Management Conference (TEMSCON)",
        "venue" : "",
        "date" : "",
        "year" : "2017",
        "preprint" : "",
         "online" : ""
      },
      {
         "paper" : "Incorporating Formal Methods and Measures Obtained through Analysis, Simulation Testing for Dependable Self-Adaptive Software in Avionics Systems",
        "authors" : [
          {
            "name" :"Rajanikanth N. Kashi"
          },
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" : "Koyalkar Raman Kishore"
          }
        ],
        "name" : "10th Annual ACM India Compute Conference",
        "venue" : "Bhopal",
        "date" : "",
        "year" : "2017",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Model-based Safety Validation for Embedded Real-time Systems",
        "authors" : [
          {
            "name" :"Gracy Philip"
          },
          {
            "name" : "Meenakshi D'Souza"
          }
        ],
        "name" : "Formal Methods for Safety and Security Case Studies for Aerospace Applications, Nanda, Manju, Jeppu, Yogananda (Eds.), Springer",
        "venue" : "",
        "date" : "May",
        "year" : "2017",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Learning framework for maturing architecture design decisions for evolving complex SoS",
        "authors" : [
          {
            "name" :"Ramakrishnan Raman"
          },
          {
            "name" : "Meenakshi D'Souza"
          }
        ],
        "name" : "in Proc. IEEE 13th System of Systems Engineering Conference",
        "venue" : "Paris, France",
        "date" : "June",
        "year" : "2018",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Worst case execution time estimation for control code of automation systems",
        "authors" : [
          {
            "name" :"Surabhi Jha"
          },
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" : "Raoul Jetley"
          },
          {
            "name" : "Sreeja Nair"
          }
        ],
        "name" : "in Proc. IEEE 4th International Conference on Advances in Computing and Communication Engineering",
        "venue" : "Paris, France",
        "date" : "June",
        "year" : "2018",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "A generic static analysis framework for domain specific languages",
        "authors" : [
          {
            "name" :"Avijit Mandal"
          },
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" : "Devina Mohan"
          },
          {
            "name" : "Raoul Jetley"
          },
          {
            "name" : "Sreeja Nair"
          }
        ],
        "name" : "in 2018 IEEE 23rd International Conference on Emerging Technologies and Factory Automation",
        "venue" : "Italy",
        "date" : "September",
        "year" : "2018",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Formal Verification of Datarace in Safety Critical ARINC653 compliant RTOS",
        "authors" : [
          {
            "name" :"Abhishek Singh"
          },
          {
            "name" : "Meenakshi D'Souza"
          },
          {
            "name" : "Arshad Ebrahim"
          }
        ],
        "name" : "in Proc. 7th IEEE ICACCI",
        "venue" : "",
        "date" : "",
        "year" : "2018",
        "preprint" : "",
         "online" : ""

      },
      {
          "paper" : "Avionics Self-adaptive Software: Towards Formal Verification and Validation",
          "authors" : [
            {
              "name" :"Meenakshi D'Souza"
            },
            {
              "name" : "Rajanikanth N. Kashi"
            }
          ],
          "name" : "ICDCIT ",
          "venue" : "",
          "date" : "",
          "year" : "2019",
          "preprint" : "",
           "online" : ""

        },
        {
            "paper" : "FrAppLe: A Framework for Apprenticeship Learning",
            "authors" : [
              {
                "name" :"Vijaya Sharvani"
              },
              {
                "name" : "Kumar Abhinav"
              },
              {
                 "name" : " Alpana Dubey"
                },
              {
                  "name" : "Sakshi Jain"
              },
              {
                  "name" : "Veenu Arora"
              },
              {
                  "name" : "Meenakshi D'Souza"
              }
            ],
            "name" : "ISEC ",
            "venue" : "",
            "date" : "",
            "year" : "2019",
            "preprint" : "",
             "online" : ""

          },
        {
            "paper" : "Efficient Power Saving Method for WiFi Direct Devices in IoT based on Hidden Markov Model",
            "authors" : [
              {
                "name" :"Sulochan Naik"
              },
              {
                  "name" : "Meenakshi D'Souza"
              }
            ],
            "name" : "11th International Conference on Communication Systems & Networks",
            "venue" : "Bengaluru, India ",
            "date" : "January 7-11",
            "year" : "2019",
            "preprint" : "",
             "online" : ""

          },
        {
            "paper" : "Formalizing GPU Instruction Set Architecture in Coq",
            "authors" : [
              {
                "name" :"Nitin Bhatia"
              },
              {
                  "name" : "Meenakshi D'Souza"
              },
              {
                  "name" : "Sujit Kumar Chakrabarti"
              }
            ],
            "name" : "Proceedings of the 12th Innovations on Software Engineering Conference",
            "venue" : "Pune, India",
            "date" : "February 14-16",
            "year" : "2019",
            "preprint" : "",
             "online" : ""

          },
        {
            "paper" : "Automated Test Case Generation for Programmable Logic Controller Code",
            "authors" : [
              {
                "name" :"Varsha P. Suresh"
              },
              {
                  "name" : "Sujit Kumar Chakrabarti"
              },
              {
                  "name" : "Raoul Jetley"
              }
            ],
            "name" : "Proceedings of the 12th Innovations on Software Engineering Conference",
            "venue" : "Pune, India",
            "date" : "February 14-16",
            "year" : "2019",
            "preprint" : "",
             "online" : ""

          },
      {
          "paper" : "Static analysis for detecting high-level races in RTOS kernels",
          "authors" : [
            {
              "name" : "Abhishek Singh"
              
            },
            {
              "name" : "Rekha Pai"
            },
            {
              "name" : " Deepak D'Souza"
            },
            {
              "name" : "Meenakshi D'Souza"
            }
          ],
          "name" : "Proceedings of Formal Methods - The Next 30 Years - Third World Congress, Springer LNCS 11800, 337-353",
          "venue" : "",
          "date" : "",
          "year" : "2019",
          "preprint" : "",
           "online" : ""
        },
      {
          "paper" : "Image processing application development on software configurable processor Array",
          "authors" : [
            {
              "name" : "Ganesha"
              
            },
            {
              "name" : "Steevan Rodrigues"
            },
            {
            	"name" :"Dr. Niranjan Chiplunkar"
              },
            {
            	"name" :"Dr. Niranjan U.C"
              }
          ],
          "name" : "International Conference on Emerging Trends in Engineering (ICETE)",
          "venue" : "",
          "date" : "",
          "year" : "",
          "preprint" : "",
           "online" : ""
        },
      {
          "paper" : "Implementation of compute intensive algorithms on software configurable processor, International Conference on Computer Architecture",
          "authors" : [
            {
              "name" : "Ganesha"
              
            },
            {
              "name" : "Steevan Rodrigues"
            },
            {
            	"name" :"Dr. Niranjan U.C"
              }
          ],
          "name" : "International Conference on Computer Architecture, Networking & Applications(IC-CANA)",
          "venue" : "",
          "date" : "",
          "year" : "",
          "preprint" : "",
           "online" : ""
        },
      {
          "paper" : "Intuitive content rendering by intelligently organizing browser tabs for enhanced user experience and better screen space utilization. Smart Tabs - A new invention for intelligently organizing the browser tabs IEEE",
          "authors" : [
            {
              "name" : "Ganesha"
              
            },
            {
              "name" : "Hemalatha M"
            }
          ],
          "name" : "Advance Computing Conference (IACC)",
          "venue" : "",
          "date" : "",
          "year" : "2015",
          "preprint" : "",
           "online" : ""
        },{
        "paper" : "StaBL: Statecharts with Local Variables",
        "authors" : [
          {
            "name" :"Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Karthika Venkatesan"
          }
        ],
        "name" : "ISEC",
        "venue" : "Jabalpur, INDIA",
        "date" : "February",
        "year" : "2020",
        "preprint" : "",
         "online" : ""

      },{
        "paper" : "Automated Testing of Refreshable Braille Display",
        "authors" : [
		{
            "name" : "Shivam Kumar Singh"
          },
          {
            "name" :"Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Dinesh Babu Jayagopi"
          }
        ],
        "name" : "14th IFIP TC9 Human Choice and Computers Conference",
        "venue" : "Tokyo",
        "date" : "September",
        "year" : "2020",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Discovering Multiple Design Approaches in Programming Assignment Submissions",
        "authors" : [
          {
            "name" :"Nikhila KN"
          },
          {
            "name" : "Sujit Kumar Chakrabarti"
          },
          { "name" : "Manish Gupta"
          }
        ],
        "name" : "The 36th ACM/SIGAPP Symposium on Applied Computing (SAC ’21)",
        "venue" : "Virtual Event, Republic of Korea",
        "date" : "March 22–26",
        "year" : "2021",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Physics Simulation based Approach to Node Clustering",
        "authors" : [
          {
            "name" :"Kapil Kalra"
          },
          {
            "name" : "Nikhila KN"
          },
          { "name" : "Sujit Kumar Chakrabarti"
          }
        ],
        "name" : "3rd International Conference on Engineering Mathematics and Computing (ICEMC 2020)",
        "venue" : "HIT Haldia",
        "date" : "February 5-7",
        "year" : "2020",
        "preprint" : "",
         "online" : ""

      },
      {
        "paper" : "Automated Evaluation of Programming Assignment --An Experience Report",
        "authors" : [
          
          { 
          "name" : "Sujit Kumar Chakrabarti"
          }
        ],
        "name" : "The Future of Learning Conference 2020",
        "venue" : "IIM BANGALORE",
        "date" : "January 3-4",
        "year" : "2020",
        "preprint" : "",
         "online" : ""

      },      
      {
        "paper" : "Detecting Heartbeat Architectural Tactic in Source Code Using Program Analysis",
        "authors" : [
          {
          "name" : "Ananta Kumar Das"
          },
          { 
          "name" : "Sujit Kumar Chakrabarti"
          }
        ],
        "name" : "ICOOSEDP 2020: International Conference on Object-Oriented Software Engineering and Design Patterns",
        "venue" : "Vienna, Austria",
        "date" : "December 24-25",
        "year" : "2020",
        "preprint" : "",
         "online" : ""

      },      
      {
        "paper" : "Detecting Code Smells using Deep Learning",
        "authors" : [
          {
          "name" : "Ananta Kumar Das"
          },
          { 
          "name" : "S. Yadav"
          },
          {
          "name" : "S. Dhal"
          }
        ],
        "name" : "TENCON 2019 - 2019 IEEE Region 10 Conference (TENCON)",
        "venue" : "Kochi, India",
        "date" : "October 17-20",
        "year" : "2019",
        "preprint" : "",
         "online" : ""

      }
    ],
  "workshop" : [
      {
        "paper" : "ACT (Abstract to Concrete Tests) - A tool for generating Concrete test cases from Formal Specification of Web Applications",
        "authors" : [
          {
            "name" : "Khusbu Bubna"
          },
          {
            "name" :"Sujit Kumar Chakrabarti"
          }
        ],
        "name" : "MODSYM 2016",
        "venue" : "Goa, INDIA",
        "date" : "February",
        "year" : "2016",
        "preprint" : "../preprints/act-2016.pdf",
         "online" : "http://ceur-ws.org/Vol-1561/paper3.pdf"

      },
      {
        "paper" : "Graduate Course in Software Testing",
        "authors" : [
          {
            "name" :"Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Meenakshi D'Souza"
          }
        ],
        "name" : "SEED 2015",
        "venue" : "Bangalore, INDIA",
        "date" : "February",
        "year" : "2015",
        "preprint" : "",
         "online" : ""
      },
      {
          "paper" : "Formalizing GPU Instruction Set Architecture in Coq",
          "authors" : [
            {
              "name" : "Nitin Bhatia"
              
            },
            {
              "name" : "Meenakshi D'Souza"
            },
            {
            	"name" :"Sujit Kumar Chakrabarti"
              }
          ],
          "name" : "ISEC",
          "venue" : "",
          "date" : "",
          "year" : "2019",
          "preprint" : "",
           "online" : ""
        }
    ],
  "journal" : [
       {
        "paper" : "A fresh look on semantics of Concurrent State Based Language (ConStaBL)",
        "authors" : [
          {
            "name" : "Karthika Venkatesan"
          },
          {
            "name" :"Sujit Kumar Chakrabarti"
          }        ],
        "name" : "Journal of Computing Languages",        
        "date" : "",
        "year" : "2024",
	"issue" : "",
        "preprint" : "../preprints/ConStaBL-2024.pdf",
         "online" : ""

      },
      {
        "paper" : "Automated Application Processing",
        "authors" : [
          {
            "name" : "Eshita Sharma"
          },
          {
            "name" : "Keshav Gupta"
          },
          {
            "name" : "Lubaina Machinewala"
          },
          {
            "name" : "Samaksh Dhingra"
          },
          {
            "name" : "Shrey Tripathi"
          },
          {
            "name" : "Shreyas S"
          },
          {
            "name" :"Sujit Kumar Chakrabarti"
          }        
	],
        "name" : "Sadhana",        
        "date" : "19 November 2022",
        "year" : "2022",
	"issue" : "",
        "preprint" : "../preprints/ConStaBL-2024.pdf",
         "online" : "https://www.ias.ac.in/public/Volumes/sadh/047/00/0244.pdf"

      },
      {
        "paper" : "Guidance Systems for Fighter Aircraft",
        "authors" : [
          {
            "name" : "Rajanikanth N. Kashi"
          },
          {
            "name" :"R S Rao"
          },
          {
            "name" :"Ajai Vohra"
          },
          {
            "name" :"P S Subramanyam"
          }
        ],
        "name" : "Defence Science Journal",        
        "date" : "July",
        "year" : "2005",
	"issue" : "",
        "preprint" : "",
         "online" : ""

      }
    ],
  "technical_report" : [
      {
        "paper" : "A Framework for Modeling and Verifying IoT Communication Protocols",
        "authors" : [
          {
            "name" : "Maithily Diwan"
          },
          {
            "name" :"Meenakshi D'Souza"
          }
        ],
        "date" : "April",
        "year" : "2017",
        "preprint" : "../preprints/TR_IoTProtocolModel.pdf",
         "online" : ""

      },
      {
        "paper" : "Constract based Development and Refinement in Simulink",
        "authors" : [
          {
            "name" : "Sujit Kumar Muduli"
          },
          {
            "name" :"Meenakshi D'Souza"
          }
        ],
        "date" : "June",
        "year" : "2017",
        "preprint" : "../preprints/Thesis-Report-MT2015113.pdf",
         "online" : ""

      },
      {
        "paper" : "VERMILLION: Verifiable MultIagent Framework for DependabLe and AdaptabLe AvIONics",
        "authors" : [
          {
            "name" : "Rajanikanth N. Kashi"
          },
          {
            "name" :"Meenakshi D'Souza"
          }
        ],
        "date" : "",
        "year" : "",
        "preprint" : "../preprints/Vermillion-TR.pdf",
         "online" : ""

      }
    ]
  }; 
  
  var element = document.getElementById("pubs");
  var output_text = journal(allpubs.journal, name) + conference(allpubs.conference, name) + workshop(allpubs.workshop, name) + techrep(allpubs.technical_report, name);

  element.innerHTML = output_text;
}
