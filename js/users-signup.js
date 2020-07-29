const btn = document.querySelector('.register');
const loadData = document.querySelector('.load-result');
const error = document.querySelector('.error-display');
const addBtn = document.querySelector('.add');
const usersContainer = document.querySelector('.search-users');
const container = document.querySelector('.container');
const title = document.querySelector('#title');

const adminToken = JSON.parse(localStorage.getItem('loginToken'));

const url = 'https://t-progress-report.herokuapp.com';

addBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    container.style.visibility ='visible';
    title.style.visibility = 'visible';
    usersContainer.style.visibility = 'hidden';
    errorResult.style.visibility = 'hidden';
})


const submitData = (info) =>{
    loadData.innerHTML = `<div class="result"></div>`
  
    fetch(`${url}/api/users/register`, {
        method:'post',
        headers:{
            'content-type':'application/json',
            'authentication': adminToken
        },
        body:JSON.stringify(info)
    })
    .then(handleResponse)
    .then(handleData)
    .catch(() =>{
        loadData.innerHTML ='';
        error.style.color = '#a90505';
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
        error.style.color ='#a90505';
        error.innerHTML = `${result.error}`;        
    }else{
        loadData.innerHTML ='';
        error.style.color ='#010611';
        error.innerHTML =`${result.msg}`;
    }
}


const inputValidation = (firstname, lastname, regNumber, school,faculty, level, options)=>{
    const namePattern = /^([^0-9])+([a-zA-Z]{1,})$/;
    const regPattern =  /^([^a-zA-Z])+([0-9]{1,})+([0-9]{1,})$/;

    if(firstname.length === 0){
        error.style.color='#a90505';
        error.innerHTML = `Please Firstname is required`;
        return false;
    }
    if(!firstname.match(namePattern)){
        error.style.color = '#a90505';
        error.innerHTML = 'Name shoudn\'t include any number';
        return false;
    }
    if(lastname.length === 0){
        error.style.color='#a90505';
        error.innerHTML = `Please lastname is required`;
        return false;
    }
    if(!lastname.match(namePattern)){
        error.style.color = '#a90505';
        error.innerHTML = 'Name shoudn\'t include any number';
        return false;
    }
    if(regNumber.length === 0){
        error.style.color = '#a90505';
        error.innerHTML = 'RegNumber is required';
        return false;
    }
    if(!regNumber.match(regPattern)){
        error.style.color = '#a90505';
        error.innerHTML = 'RegNumber must be numbers';
        return false;
    }
    if(regNumber.length != 9){
        error.style.color='#a90505';
        error.innerHTML = `RegNumber must be 9 characters long`;
        return false;
    }
    if(school.length === 0){
        error.style.color='#a90505';
        error.innerHTML = `School is required`;
        return false;
    }
    if(!school.match(namePattern)){
        error.style.color = '#a90505';
        error.innerHTML = 'School shoudn\'t include any number';
        return false;
    }
    if(faculty.length === 0){
        error.style.color='#a90505';
        error.innerHTML = `Faculty is required`;
        return false;
    }
    if(!faculty.match(namePattern)){
        error.style.color = '#a90505';
        error.innerHTML = 'Faculty shoudn\'t include any number';
        return false;
    }
    if(level.length === 0){
        error.style.color='#a90505';
        error.innerHTML = `Level is required`;
        return false;
    }
    if(!level.match(regPattern)){
        error.style.color = '#a90505';
        error.innerHTML = 'Level must be a number';
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


/** 
 
 
fetching all users


*/

const errorResult = document.querySelector('.users-error');
const searchInput = document.querySelector('.search');




//function to fetch all reports in DB
function displayReport(){
    console.log(errorResult)
    container.style.visibility ='hidden';
    title.style.visibility = 'hidden';
    usersContainer.style.visibility = 'visible';
    errorResult.style.visibility = 'visible';
    
    fetch(`${url}/api/users/all`, {
    method:'GET',
    headers:{
        'content-type':'application/json',
        'authentication':adminToken
    }
    })
    .then(handleResponse)
    .then(validateData)
    .catch(error =>{
        errorResult.style.color = '#a90505';
        errorResult.innerHTML = 'Something went wrong, try again!'
    });
}

//Response type handling 
 function handleResponse(response){
        let contentType = response.headers.get('content-type');

        if(contentType.includes('application/json')){
            return response.json()
        } else if (contentType.includes('text/html')) {
            return response.text();
        }else{
            throw new Error(`Content-type ${contentType} not supported`)
        }
    }


//function to check data validity
function validateData(data){
        if(!adminToken){
            errorResult.style.color = '#a90505';
            errorResult.innerHTML = 'Access Denied';
            return false;
        }
        if(data.error){
            errorResult.style.color = '#a90505';
            errorResult.innerHTML = data.error;
            return false;
        }else{
            const result = document.querySelector('.search-users')
            const mapped = data.map(element => {
                return `
                <div class='container-users'>
                <tr><span>Firstname</span>: ${element.firstName}</tr><br>
                <tr><span>Lastname</span>: ${element.lastName}</tr><br>
                <tr><span>RegNumber</span>: ${element.regNumber}</tr><br>
                <tr><span>School</span>: ${element.address.school}</tr><br>
                <tr><span>Faculty</span>: ${element.address.faculty}</tr><br>
                <tr><span>Level</span>: ${element.address.level}</tr><br>
                </div>
                <div class="btns">
                <button id="edit" onclick="editUser()">Edit</button>
                <button id="delete" onclick="deleteUser()">Delete</button>
                </div>
                `
            }).join('');
        result.innerHTML = mapped;
        
      }
 }


 /**
  Edit users
  
  */

 function editUser(id){
    const editBtn = Array.from(document.querySelectorAll('#edit'));
    
    editBtn.forEach(element =>{
        element.addEventListener('click', (e) =>{
            const inputEdit = document.querySelector('small');
            const inputValues = document.createElement('div');
            inputValues.innerHTML = `<div id="input-edit">
            <label for="school">School</label>
            <input type="text" name="school" id="school" placeholder="Enter Your School" value="">
            <label for="faculty">Faculty</label>
            <input type="text" name="faculty" id="faculty" placeholder="Enter Your Faculty" value="">
            <label for="level">Level</label>
            <input type="text" name="level" id="level" placeholder="Enter Your Level" value="">
        </div>
        <button type="submit" class="submit" onclick='modifyUser()'>Submit</button>
        <div id="edit-error"></div>`;
        inputEdit.append(inputValues);
        })
    })
 }

 function modifyUser(){
    const submitBtn = document.querySelector('.submit');
    const editError = document.querySelector('#edit-error');
    
    const editedUser =(data) =>{
        const adminToken = JSON.parse(localStorage.getItem('loginToken'));
    
        fetch(`${url}/api/users/edit/:id`, {
            method:'PUT',
            headers:{
                'content-type':'application/json',
                'authentication': adminToken
            },
            body:JSON.stringify(data)
        })
        .then(handleResponse)
        .then(handleData)
        .catch(err =>{
            console.log(err)
        })
    }

    //Function for handling response type
    function handleResponse(response){
        const contentType = response.headers.get('content-type');
        if(contentType.includes('application/json')){
            return response;
        }
        if(contentType.includes('text/html')){
            return response;
        }else{
            throw new Error(`content-type ${contentType} not supported`)
        }
    }
    //function for cheching data validity
    function handleData(data){
        if(!adminToken){
            editError.style.color = '#a90505';
            editError.innerHTML = 'Access denied';
            return false;
        }
        if(data.error){
            editError.style.color = '#a90505';
            editError.innerHTML = data.error;
            return false;
        }else{
            editError.style.color = '#010611';
            editError.innerHTML = data.msg;
        }
    }
    
    // Input client-side validation
    const checkInput = (school, faculty, level, inputData) =>{
        const namePattern = /^[^0-9]/;
        if(school.length === 0){
            error.style.color='#a90505';
            error.innerHTML = `School is required`;
            return false;
        }
        if(!school.match(namePattern)){
            error.style.color = '#a90505';
            error.innerHTML = 'School shoudn\'t be started with a number';
            return false;
        }
        if(faculty.length === 0){
            error.style.color='#a90505';
            error.innerHTML = `Faculty is required`;
            return false;
        }
        if(!faculty.match(namePattern)){
            error.style.color = '#a90505';
            error.innerHTML = 'Faculty shoudn\'t be started with a number';
            return false;
        }
        if(level.length === 0){
            error.style.color='#a90505';
            error.innerHTML = `Level is required`;
            return false;
        }
        if(!level.match(regPattern)){
            error.style.color = '#a90505';
            error.innerHTML = 'Level must be a number';
            return false;
        }else{
            editedUser(inputData);
        }
    }
    
    //Event fire to submit updated users' data
    submitBtn.addEventListener('click', (e) =>{
        e.preventDefault();
        const school = document.querySelector('#school').value;
        const faculty = document.querySelector('#faculty').value;
        const level = document.querySelector('#level').value;
    
        const updateInfo = {
            school,
            faculty,
            level
        }
    
        checkInput(
            school,
            faculty,
            level,
            updateInfo
        )
    })
 }
