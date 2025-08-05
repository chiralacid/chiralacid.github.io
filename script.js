//running navbar script below
function navbarColor() {
    var navbarContainer = document.getElementById('navbar');
    var navLinks = navbarContainer.getElementsByTagName("a");

    //get file name
    var currentPage = window.location.pathname.split("/").pop();

    // adds active class to current page
    for (var i = 0; i < navLinks.length; i++) {
        var link = navLinks[i].getAttribute("href");

        if (link === currentPage) 
            navLinks[i].classList.add("active");
        
        else 
            navLinks[i].classList.remove("active");
        
    }
}

navbarColor()

