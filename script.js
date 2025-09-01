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
//keeps track of total slideshows in index
const slideshowCount= document.getElementsByClassName("slideshow_container").length;
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

//lancer button audio code

let played = [0,0,0,0,0];

function zeroPlayed(selection)
{
    for (let i=0; i<played.length; i++){
        if (i!=selection)
            played[i]=0;
    }
}

function play(){
    let random = Math.floor(Math.random() * (Math.floor(100) - Math.ceil(0)) + Math.ceil(0));

    let audioPlayer;
    let img; 

    // hide all images
    document.querySelectorAll("#lancer_sprite, #snake, #nightmare, #doakes")
    .forEach(el => {
        el.style.display = "none";
        el.classList.remove("fade");
        el.style.zIndex = "0";
        el.style.animation = "none"; // reset doakes
    });

    if (random<10 && played[0]!=1)
    {
        audioPlayer = document.getElementById('lancer_splosh');
        img=document.getElementById('lancer_sprite');
        played[0]=1;
        zeroPlayed(0)
    }
    else if (random>=10 && random < 20 && played[1]!=1)
    {
        audioPlayer = document.getElementById('mgs_alert');
        img=document.getElementById('snake');
        played[1]=1;
        zeroPlayed(1)
    }
    else if (random>=20 && random<95)
    {
        if (random>=20 && random<45 && played[2]!=1)
        {
            audioPlayer = document.getElementById('dd_tone');
            played[2]=1;
            zeroPlayed(2)
        }
        else if (random>=45 && random <70 && played[3]!=1)
        {
            audioPlayer = document.getElementById('dexter_piano');
            img=document.getElementById('doakes');
            img.style.animation='';
            played[3]=1;
            zeroPlayed(3)
        }
        else if (random>=70 && played[4]!=1)
        {
            audioPlayer = document.getElementById('pcrp_tone');
            played[4]=1;
            zeroPlayed(4)
        }
            
    } 
    else if (random>=95 && played[5]!=1)
    {
        audioPlayer = document.getElementById('fnaf_ani_door');
        img=document.getElementById('nightmare');
        played[5]=1;
        zeroPlayed(5)
    }

    //rerolls audio if nothing will play
    if (audioPlayer==null)
        play();
        
    if (img!=null)
    {
        img.style.display = 'none';
        showImg(img,audioPlayer.duration);
    }
    if (audioPlayer!=null){
        document.querySelectorAll(".buttonAudio").forEach(a => {
            a.pause();
            a.currentTime = 0;
        });
        audioPlayer.play();
    }
        
}

function showImg(img, duration)
{
    img.classList.remove('fade');
    img.style.display = 'block';
    
    timer(img, duration);
}

let imgShowing=0;
let timeoutId;

function timer(img, duration){

    //clear existing timer if running
    clearTimeout(timeoutId);

    if (img.id === 'doakes') {
        duration = 10;

        //force animation restart
        img.style.animation = 'none';
        img.offsetHeight;
        img.style.animation = 'fadeinout 10s linear forwards';

        imgShowing = 1;

        timeoutId = setTimeout(function () {
            img.style.animation = 'none';
            imgShowing = 0;
            img.style.display = 'none';
        }, duration * 1000);
    }
        
    else
    {
        img.classList.remove('fade');
        img.style.transition='opacity 100ms';
        
        if (img.id==='nightmare')
            img.style.zIndex='1000';
            
        setTimeout(function(){ 
            img.style.transition='opacity '+duration*1000+'ms';
            img.classList.add('fade');
            
            if (img.id==='nightmare')
            {
                img.style.zIndex='0';
                img.style.transition='opacity '+duration*200+'ms';
            }
                

        }, duration*1000);
    }
}

        
function loadButtonAudio(){
    let audio=document.getElementsByClassName('buttonAudio');
    for(let i=0; i<audio.length; i++)
    {
        audio[i].load();
    }
}

//stop audio/video out of view
document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("video.autopause");

    const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.pause(); // pause when out of view
            });
    }, { threshold: 0.25 });//60% of video not visible

    videos.forEach(video => {

        observer.observe(video);

        //pauses if other video is played
        video.addEventListener("play", () => {
            videos.forEach(v => {
                if (v !== video && !v.paused) {
                    v.dataset.userPaused = "true";
                    v.pause();
                }
            });
            video.dataset.userPaused = "";
        });

        // clear auto-pause for manual pauses
        video.addEventListener("pause", () => {
            if (!video.dataset.userPaused) {
                video.dataset.userPaused = "true";
            }
        });
    }); 
});




function fullView(imgSrc){ 
    fullImg = document.getElementById("full_image");
    fullImg.src = imgSrc.src; 
    document.getElementById("full_view_image").style.display="block"; 
}
function closeFullView(){
    document.getElementById("full_view_image").style.display="none";
}


function zoomModel(modelSrc) {
    let fullModel = document.getElementById("full_model");
    // Set the 3D model source from the thumbnail
    fullModel.src = modelSrc.src; 
    // Show the fullscreen overlay
    document.getElementById("full_view_model").style.display = "block";
}
function closeFullViewModel(){
    document.getElementById("full_view_model").style.display="none";
}


//change background color on full view scripts

function changeFullViewBackground(color){
    document.getElementById("full_view_image").style.backgroundColor=color;

    document.documentElement.style.setProperty('--close_button_color_full_img_view', invert(color));
    document.documentElement.style.setProperty
        ('--close_button_color_hover_focus_full_img_view', alterColor(invert(color)));
}
function alterColor(rgb) {
    
    let rgbArr = rgb.replace(/rgba?\(|\)|\s/gi, '').split(',');

    let r = parseInt(rgbArr[0]);
    let g = parseInt(rgbArr[1]);
    let b = parseInt(rgbArr[2]);
    let a = rgbArr.length === 4 ? parseFloat(rgbArr[3]) : 1;

    let brightness = (r + g + b) / 3;//avg brightness

    if (brightness < 80) {
        r = Math.min(255, r + 50); 
        g = Math.min(255, g + 50); 
        b = Math.min(255, b + 50); 
    }
    else if (brightness > 175) {
        r = Math.max(0, r - 50);  
        g = Math.max(0, g - 50); 
        b = Math.max(0, b - 50);  
    }
    else {
        r = Math.min(255, r + 30); 
        g = Math.min(255, g + 30);  
        b = Math.min(255, b + 30);  
    }

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function invert(rgb) {
    rgb = [].slice.call(arguments).join(",").replace(/rgb\(|\)|rgba\(|\)|\s/gi, '').split(',');
    let alpha=rgb[3];

    rgbSave=[rgb[0],rgb[1],rgb[2]];

    for (var i = 0; i < rgb.length; i++) rgb[i] = (i === 3 ? 1 : 255) - rgb[i];

    //if gray, then change to white or black completely
    if (( rgb[0]==rgb[1] && rgb[1]==rgb[2] ) && ( rgb[0]!=0 && rgb[0]!=255 ) )
    {
        if (rgb[0]<128)//set to white if closer to black
        {
            rgb[0]=0;
            rgb[1]=0;
            rgb[2]=0;
        }
        else
        {
            rgb[0]=255;
            rgb[1]=255;
            rgb[2]=255;
        }
    }
    rgb[3]=alpha;//preserves opacity
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3]})`;
}

//special button scripts

let pickBg=0;

function changePageBackground(){
    if (pickBg==0)
    {
        document.body.style.backgroundImage="url('resources/backgrounds/yume_nikki.png')";
 

        allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
        element.style.fontFamily = 'yumenikki'; 
        });
        pickBg=1;
    }
    else
    {
        document.body.style.backgroundImage="url('resources/backgrounds/grey_hexagons_on_black_background.jpg')";

        allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
        element.style.fontFamily = 'Ubuntu Mono'; 
        });
        pickBg=0;
    }
}


//random cat scripts
function randomCat(){
    let random = Math.floor(Math.random() * (Math.floor(13) - Math.ceil(1)) + Math.ceil(1));

    switch(random)
    {
        case 1:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/angry_cat.png");
        
        case 2:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/awkward_cat.png");

        case 3:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/baby_jinx.jpg");

        case 4:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/brushing_cat.png");
        
        case 5:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/buff_cat.jpg");

        case 6:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/chef_kitten.jpg");

        case 7:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/cute_little_white_kitten.png");
        
        case 8:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/egg_jinx.jpg");

        case 9:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/fat_box_cat.jpg");

        case 10:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/fat_cat.png");
        
        case 11:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/glue_kitten.png");

        case 12:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/grumpy_cat.png");
        
        case 13:
            return document.getElementById('cat_button').setAttribute('href',"resources/images/cats/smug_cat.jpg");
    }
}


loadButtonAudio()

loadSlides()

updateNavbar(media)
