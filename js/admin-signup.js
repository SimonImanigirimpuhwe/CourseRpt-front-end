const loadData = document.querySelector('.load-result');
const errorResult = document.querySelector('.error-display');
const button = document.querySelector('.register')
const nameInput = document.querySelector('#firstName');


const postData = (info) =>{
    loadData.innerHTML = `<div class="result"></div>`;
  
    fetch('https://t-progress-report.herokuapp.com/api/admins/signup', {
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(info)
    })
    .then(handleResponse)
    .then(handleData)
    .catch(() =>{
        loadData.innerHTML ='';
        errorResult.style.color = '#a90505';
        errorResult.innerHTML = 'Something went wrong, try again!'
    })
}

function handleResponse(response){
    let contentType = response.headers.get('content-type');

    if(contentType.includes('application/json')){
        return response.json();
    } else if (contentType.includes('text/html')) {
        return response.text();
    }else{
        throw new Error(`Content-type ${contentType} not supported`)
    }
}
function handleData(result){
    if(result.error){
        loadData.innerHTML = '';
        errorResult.style.color ='#a90505';
        errorResult.innerHTML = `${result.error}`;
              
    }else{
        loadData.innerHTML ='';
        errorResult.style.color ='#010611';
        errorResult.innerHTML =`${result.msg}`;
        setTimeout(() =>{
            localStorage.setItem('adminToken', JSON.stringify(result.token));
            location.href ='./admin-login.html'
        }, 5000); 
    }
}


const inputValidation = (firstname, lastname, username, email, password, options)=>{
    const emailPattern = /^[^0-9A-Z]/;
    const namePattern = /^[^0-9]/;
   
    if(firstname.length === 0){
        errorResult.style.color='#a90505';
        errorResult.innerHTML = 'Please Firstname is required';
        return false;
    }
    if(!firstname.match(namePattern)){
        errorResult.style.color = '#a90505';
        errorResult.innerHTML = 'Firstname shouldn\'t be started with a number';
        return false;
    }
    if(lastname.length === 0){
        errorResult.style.color='#a90505';
        errorResult.innerHTML = 'Please lastname is required';
        return false;
    }
    if(!lastname.match(namePattern)){
        errorResult.style.color = '#a90505';
        errorResult.innerHTML = 'Lastname shouldn\'t be started with a number';
        return false;
    }
    if(username.length === 0){
        errorResult.style.color='#a90505';
        errorResult.innerHTML = 'Please username is required';
        return false;
    }
    if(!username.match(namePattern)){
        errorResult.style.color = '#a90505';
        errorResult.innerHTML = 'Username shouldn\'t be started with a number';
        return false;
    }
    if(username.length < 5){
        errorResult.style.color = '#a90505';
        errorResult.innerHTML = 'Username must be at least 5 characters long';
        return false;
    }
    if(email.length === 0){
        errorResult.style.color='#a90505';
        errorResult.innerHTML = 'Please Email must be valid';
        return false;
    }
    if(!email.match(emailPattern)){
        errorResult.style.color = '#a90505';
        errorResult.innerHTML = 'Email shoudn\'t be started either with a number or capital letter';
        return false;
    }
    if(password.length === 0){
        errorResult.style.color='#a90505';
        errorResult.innerHTML = 'Please Password is required';
        return false;
    }
    if(password.length < 8){
        errorResult.style.color='#a90505';
        errorResult.innerHTML = 'Password must be 8 characters long';
        return false;
    }
    else{
        postData(options)
    }
}

button.addEventListener('click',(e)=>{
    e.preventDefault();
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const password = document.querySelector('#password').value;
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;

    const adminData ={
        firstName,
        lastName,
        username,
        email,
        password,
    };

    inputValidation(
        firstName,
        lastName,
        username,
        email,
        password,
        adminData
    )
});

//Return to home page
const returnBtn = document.querySelector('.back');

returnBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    loadData.innerHTML = `<div class="result"></div>`
    setTimeout(() =>{
        loadData.innerHTML = '';
        location.href = './index.html';
    }, 5000);
})
