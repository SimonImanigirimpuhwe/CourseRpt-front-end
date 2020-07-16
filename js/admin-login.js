const passwordInput = document.querySelector('#password');
const usernameInput = document.querySelector('#username');
const loadData = document.querySelector('.load-result');
const errorResult = document.querySelector('.error-display');
const button = document.querySelector('.register');


const postData = (data) =>{
    loadData.innerHTML = `<div class="result"></div>`
  
    fetch('http://localhost:3000/api/v1/admins/login', {
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
            localStorage.setItem('loginToken', JSON.stringify(result.token));
            location.href ='./reports-search.html'
        }, 5000)
        
       
        console.log('sucess:', result)  
    }
}


const inputValidation = (username, password, obj)=>{
    if(username.length =''){
        errorResult.style.color='red';
        errorResult.innerHTML = `Please enter a valid regNumber`;
        return false;
    }
    if(password.length < 6){
        errorResult.style.color='red';
        errorResult.innerHTML = `Password must be at least 6 characters long`;
        return false;
    }
    else{
        postData(obj)
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
    location.href = './admin-signup.html'
})