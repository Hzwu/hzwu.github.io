
/** This is a really hacky way to load the navigation bar to the main html pages **/

var navbar = 
// First, draw the logo image and the title
['<div id="head">',
'<div id="logo">',
'<a href="home.html"></a>',
'</div>',
'<div id="title">',
'<h1>Welcome to Dr. Hanzhou Wu\'s Homepage</h1>',
'</div>',
'</div>',

// Begin navigation list
'<ul id="list-nav">',

'<li><a href="index.html">Home</a></li>',
'<li><a href="shortbio.html">Short Bio</a></li>',
'<li><a href="publications.html">Publications</a></li>',
'<li><a href="services.html">Services</a></li>',
'<li><a href="projects.html">Projects</a></li>',
'<li><a href="students.html">Students</a></li>',
'<li><a href="contact.html">Contact</a></li>',
'</ul>'].join('');

document.write(navbar);
