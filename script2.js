const navbar=document.getElementById('navbar')
const navLinks=document.querySelectorAll('nav a')
const media=windows.matchMediawindow("(width < 850px)")

media.addEventListener('change', (e) => updateNavbar(e))

//removes focus on sidebar for mobile without hiding visually
function updateNavbar(e){
    const isMobile=e.matches
    console.log(isMobile)
    if(isMobile){
        navbar.setAttribute('inert', '')
    }
    else{
        navbar.removeAttribute('inert', '')
    }
}

function openSidebar(){
    navbar.classList.add('show')
    navbar.removeAttribute('inert', '')
}

function closeSidebar(){
    navbar.classList.remove('show')
    navbar.setAttribute('inert', '')
}

//closes sidebar for on-page navlinks
navLinks.forEach (link=>{
    link.addEventListener('click', ()=>{
        closeSidebar();
    })
})


updateNavbar(media)