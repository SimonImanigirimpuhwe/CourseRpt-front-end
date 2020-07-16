const loadData = document.querySelector('.load-result');
const errorResult = document.querySelector('.error-display');
const button = document.querySelector('.register')



const postData = (info) =>{
    loadData.innerHTML = `<div class="result"></div>`
  
    fetch('http://localhost:3000/api/v1/admins/signup', {
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(info)
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
            localStorage.setItem('adminToken', JSON.stringify(result.token));
            location.href ='./admin-login.html'
        }, 5000)
        
       
        console.log('sucess:', result)  
    }
}


const inputValidation = (firstname, lastname, username, email, password, options)=>{
    if(firstname.length === 0){
        errorResult.style.color='red';
        errorResult.innerHTML = `Please Firstname is required`;
        return false;
    }
    if(lastname.length === 0){
        errorResult.style.color='red';
        errorResult.innerHTML = `Please lastname is required`;
        return false;
    }
    if(username.length === 0){
        errorResult.style.color='red';
        errorResult.innerHTML = `Please username is required`;
        return false;
    }
    if(email.length === 0){
        errorResult.style.color='red';
        errorResult.innerHTML = `Please Email must be valid`;
        return false;
    }
    if(password.length < 6){
        errorResult.style.color='red';
        errorResult.innerHTML = `Password must be 6 characters long`;
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