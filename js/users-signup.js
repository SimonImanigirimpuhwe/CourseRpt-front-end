const btn = document.querySelector('.register');
const loadData = document.querySelector('.load-result');
const error = document.querySelector('.error-display')

const adminToken = JSON.parse(localStorage.getItem('loginToken'));


const submitData = (info) =>{
    loadData.innerHTML = `<div class="result"></div>`
  
    fetch('http://localhost:3000/api/v1/users/register', {
        method:'post',
        headers:{
            'content-type':'application/json',
            'authentication': adminToken
        },
        body:JSON.stringify(info)
    })
    .then(handleResponse)
    .then(handleData)
    .catch(err =>{
        console.log(err)
        loadData.innerHTML ='';
        error.style.color = 'red';
        error.innerHTML = 'Something went wrong, try again!'
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
        error.style.color ='red';
        error.innerHTML = `${result.error}`;
              
    }else{
        loadData.innerHTML ='';
        error.style.color ='black';
        error.innerHTML =`${result.msg}`;
        setTimeout(() =>{
            location.href ='./admin-login.html'
        }, 5000)
        
       
        console.log('sucess:', result)  
    }
}


const inputValidation = (firstname, lastname, regNumber, school,faculty, level, options)=>{
    if(firstname.length === 0){
        error.style.color='red';
        error.innerHTML = `Please Firstname is required`;
        return false;
    }
    if(lastname.length === 0){
        error.style.color='red';
        error.innerHTML = `Please lastname is required`;
        return false;
    }
    if(regNumber.length != 9){
        error.style.color='red';
        error.innerHTML = `RegNumber must be 9 characters long`;
        return false;
    }
    if(school.length === 0){
        error.style.color='red';
        error.innerHTML = `School is required`;
        return false;
    }
    if(faculty.length === 0){
        error.style.color='red';
        error.innerHTML = `Faculty is required`;
        return false;
    }
    if(level.length = ''){
        error.style.color='red';
        error.innerHTML = `Level is required`;
        return false;
    }
    else{
        submitData(options)
    }
}
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const firstName = document.querySelector('#firstname').value;
    const lastName = document.querySelector('#lastname').value;
    const regNumber = document.querySelector('#regnumber').value;
    const school = document.querySelector('#school').value;
    const faculty = document.querySelector('#faculty').value;
    const level = document.querySelector('#level').value; 

    const signupData ={
        firstName,
        lastName,
        regNumber,
        school,
        faculty,
        level,
    }
    inputValidation(
        firstName,
        lastName,
        regNumber,
        school,
        faculty,
        level,
        signupData
    )
})

//return admin to reports page
const returnBtn = document.querySelector('.back');

returnBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    location.href ='./reports-search.html';
})
