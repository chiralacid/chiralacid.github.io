//sidebar scripts 
const navLinks=document.querySelectorAll('nav a')
const navbar=document.getElementById('navbar')
const media=window.matchMedia("(max-width: 800px)")

media.addEventListener('change', (e) => updateNavbar(e))

//removes focus on sidebar for mobile without hiding visually
function updateNavbar(e){
    const isMobile=e.matches
    if(isMobile){
        navbar.setAttribute('inert', '')
    }
    else{
        navbar.removeAttribute('inert', '')
    }
}

function openSidebar(e){
        navbar.classList.add('show');
        navbar.removeAttribute('inert', '');
}

function closeSidebar(e){
        navbar.classList.remove('show');
        navbar.setAttribute('inert', '');

} 

//closes sidebar for on-page nav links
navLinks.forEach (link=>{
    link.addEventListener('click', ()=>{
        if (media.matches)
            closeSidebar();
    })
}) 


/*Slideshow code*/

let slideIndex = 1;
const slideshowCount=2;//keeps track of total slideshows in index
showSlides(slideIndex);

function plusSlides(n, slideId) {
    showSlides(slideIndex+=n, slideId);
}

function showSlides(n, slideId) {
    let i;
    if (slideId===undefined)
        slideId=1;

    let slides = document.getElementsByClassName("slides"+slideId);

    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
    }
    
    slides[slideIndex-1].style.display = "block";      
}

//loads all slideshows to first slide in index
function loadSlides(){
    let temp=1;
    for(j=0; j<=slideshowCount; j++){
        let slides = document.getElementsByClassName("slides"+temp);
        for (i = 1; i < slides.length; i++) {
                slides[i].style.display = "none";  
        }
        temp+=1;
    }        
}

loadSlides()

updateNavbar(media)
