const btn = document.querySelector('.btn');
const body = document.querySelector('body');

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