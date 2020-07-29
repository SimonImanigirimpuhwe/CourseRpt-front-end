const passwordInput = document.querySelector('#password');
const usernameInput = document.querySelector('#username');
const loadData = document.querySelector('.load-result');
const errorResult = document.querySelector('.error-display');
const button = document.querySelector('.register');

//https://t-progress-report.herokuapp.com
const postData = (data) =>{
    loadData.innerHTML = `<div class="result"></div>`
  
    fetch('https://t-progress-report.herokuapp.com/api/admins/login', {
        method:'post',
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
            localStorage.setItem('loginToken', JSON.stringify(result.token));
            location.href ='./reports-search.html'
        }, 5000)
    }
}


const inputValidation = (username, password, inputOptions)=>{
    const usernamePattern = /^[^0-9]/;
    if(username.length === 0){
        errorResult.style.color='#a90505';
        errorResult.innerHTML = `Please Username is required`;
        return false;
    }
    if(!username.match(usernamePattern)){
        errorResult.style.color = '#a90505';
        errorResult.innerHTML = 'Username shouldn\'t be started with a number'
    }
    if(password.length === 0){
        errorResult.style.color='#a90505';
        errorResult.innerHTML = `Please Password is required`;
        return false;
    }
    if(password.length < 8){
        errorResult.style.color='#a90505';
        errorResult.innerHTML = `Password must be at least 8 characters long`;
        return false;
    }
    else{
        postData(inputOptions)
    }
}

button.addEventListener('click', (e)=>{
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    const loginData ={
        username,
        password
    }

    inputValidation(
        username,
        password,
        loginData
    )
});

// Return back to signup form
const backIncon = document.querySelector('.back');
backIncon.addEventListener('click', (e) =>{
    e.preventDefault()
    loadData.innerHTML = `<div class="result"></div>`
    setTimeout(() =>{
        loadData.innerHTML ='';
        location.href = './admin-signup.html'
    }, 5000);
    
})