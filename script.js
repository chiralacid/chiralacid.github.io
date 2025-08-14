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

updateNavbar(media)
