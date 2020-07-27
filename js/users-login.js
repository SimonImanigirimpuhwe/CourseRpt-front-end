const btn = document.querySelector('button');
const loadData = document.querySelector('.load-result');
const errorResult = document.querySelector('.error-display');

const url = 'https://t-progress-report.herokuapp.com';

const postData = (data) =>{
    loadData.innerHTML = `<div class="result"></div>`
  
    fetch(`${url}/api/users/login`, {
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(handleResponse)
    .then(handleData)
    .catch(err =>{
        console.log(err)
        loadData.innerHTML ='';
        errorResult.style.color = 'red';
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
        errorResult.style.color ='red';
        errorResult.innerHTML = `${result.error}`;
              
    }else{
        loadData.innerHTML ='';
        errorResult.style.color ='black';
        errorResult.innerHTML =`${result.msg}`;
        setTimeout(() =>{
            localStorage.setItem('UserToken', JSON.stringify(result.token));
            location.href ='./report.html'
        }, 5000)
    }
}


const inputValidation = (reg, obj)=>{
    const regPattern = /[^a-zA-Z]/;
    if(reg.length === 0){
        errorResult.style.color = 'red';
        errorResult.innerHTML = 'RegNumber is required';
        return false
    }
    if(!reg.match(regPattern)){
        errorResult.style.color = 'red';
        errorResult.innerHTML = 'RegNumber must be numbers';
        return false;
    }
    if(reg.length != 9){
        errorResult.style.color='red';
        errorResult.innerHTML = 'RegNumber must be 9 characters long';
        return false;
    }else{
        postData(obj)
    }
}

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const regNumber = document.querySelector('input').value;
    
    const loginData ={
        regNumber,
    }

    inputValidation(
        regNumber,
        loginData
    )
});

//allow user go back to home page

const logoutBtn = document.querySelector('.logout');

logoutBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    loadData.innerHTML = `<div class="result"></div>`
    setTimeout(() =>{
        loadData.innerHTML ='';
        location.href ='./index.html';
    }, 5000);
})