const btn = document.querySelector('.btn');
const body = document.querySelector('body');
const menu = document.querySelector('.menu')


btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const guidline = document.querySelector('.guidline');
    guidline.classList.toggle('visible')
    if(guidline.classList.contains('visible')){
        body.style.overflow ='scroll';
    }else{
        body.style.overflow ='hidden';
    }
})


//Add functionalities to make Navigation Bar responsive
const spanIncon = document.querySelector('.span');
const hamberg = document.querySelector('.fa-bars');
const searchFa = document.querySelector('.fa-search');


window.addEventListener('resize', checkWidth);
function checkWidth() {
    const widthValue = window.screen.width;
    if (widthValue >= 671) {
        menu.className = 'menu';
    } else {
        menu.className = 'dropdown'
    }
}
spanIncon.addEventListener('click', (e) => {

    if (e.target.classList.contains('fa-bars')) {
        spanIncon.innerHTML = `<span class='fas span'><i class='fas fa-times'></i></span>`
        menu.className = 'dropdown';
    }
    if (e.target.classList.contains('fa-times')) {
        spanIncon.innerHTML = `<span class='fas span'><i class='fas fa-bars'></i></span>`;
        menu.className = 'menu';

    }
})