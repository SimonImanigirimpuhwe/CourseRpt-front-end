const btn = document.querySelector('.btn');
const result = document.querySelector('.result');
const loadResult = document.querySelector('.load-holder')
const logoutBnt = document.querySelector('.logout');
const ReportDate = document.querySelector('.report');

document.addEventListener('DOMContentLoaded',() =>{
    const reportTime = new Date();
    const currentTime = new Intl.DateTimeFormat('en-US', { dateStyle: 'full'}).format(reportTime)
    ReportDate.append(reportTime)
})

const url = 'https://t-progress-report.herokuapp.com';
const savedToken = JSON.parse(localStorage.getItem('UserToken'));

const postForm = (inputValue) =>{
    loadResult.innerHTML = `<div class='load-result'></div>`;

    fetch(`${url}/api/report`,{
    method:'post',
    headers:{
        'content-type':'application/json',
        'auth-token':savedToken
    },
    body:JSON.stringify(inputValue)
})
.then(handleResponse)
.then(data => {
    if(!savedToken){
        loadResult.innerHTML ='';
        result.style.color = '#a90505';
        result.innerHTML = 'Access denied';
       return false;
    }
    if(data.error){
        loadResult.innerHTML = '';
        result.style.color = '#a90505';
        result.innerHTML = `${data.error}`;
        return false;
    }else{
        loadResult.innerHTML = '';
        result.style.color ='#010611'
        result.innerHTML = data.msg;
    }
})
.catch(() => {
    loadResult.innerHTML ='';
    result.innerHTML = 'Something went wrong, try later'
})
}

const formValidation = (school, faculty, level,numStundets, date, day, hrs, module, component, activity, lecturerName, observation, inputData) =>{
    const namePattern = /[^0-9]/;
    const timeFormat = /[^a-zA-Z]/;
    if(school.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please school is required!';
        return false;
    }
    if(!namePattern.test(school)){
        result.style.color = '#a90505';
        result.innerHTML = 'School shoudn\'t be a number';
        return false;
    }
    if(faculty.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please faculty is required!';
        return false;
    }
    if(!faculty.match(namePattern)){
        result.style.color = '#a90505';
        result.innerHTML = 'Faculty shoudn\'t be a number';
        return false;
    }
    if(level.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please class level is required!';
        return false;
    }
    if(!level.match(timeFormat)){
        result.style.color = '#a90505';
        result.innerHTML = 'Class level must be a number';
        return false;
    }
    if(numStundets.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please Number of students is required!';
        return false;
    }
    if(!numStundets.match(timeFormat)){
        result.style.color = '#a90505';
        result.innerHTML = 'Number of students must be a number';
        return false;
    }
    if(date.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please Day is required!';
        return false;
    }
    if(!date.match(namePattern)){
        result.style.color = '#a90505';
        result.innerHTML = 'Days shoudn\'t be a number';
        return false;
    }
    if(day.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please Date is required!';
        return false;
    }
    if(hrs.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please Hours are required!';
        return false;
    }
    if(!hrs.match(timeFormat)){
        result.style.color = '#a90505';
        result.innerHTML = 'Hours must be a number';
        return false;
    }
    if(module.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please Module is required!';
        return false;
    }
    if(!module.match(namePattern)){
        result.style.color = '#a90505';
        result.innerHTML = 'Module shoudn\'t be a number';
        return false;
    }
    if(component.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please Component is required!';
        return false;
    }
    if(!component.match(namePattern)){
        result.style.color = '#a90505';
        result.innerHTML = 'Component shoudn\'t be a number';
        return false;
    }
    if(activity.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please Activity is required!';
        return false;
    }
    if(!activity.match(namePattern)){
        result.style.color = '#a90505';
        result.innerHTML = 'Activity shouldn\'t be a number';
        return false;
    }
    if(lecturerName.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please name of lecturer is required!';
        return false;
    }
    if(!lecturerName.match(namePattern)){
        result.style.color = '#a90505';
        result.innerHTML = 'Name of lecturer shoudn\t be a number';
        return false;
    }
    if(observation.length === 0){
        result.style.color = '#a90505';
        result.innerHTML = 'Please Observation is required!';
        return false;
    }
    if(!observation.match(namePattern)){
        result.style.color = '#a90505';
        result.innerHTML = 'Observation shouldn\'t be a number';
        return false;
    } else{
        postForm(inputData)
    }
}
btn.addEventListener('click', () =>{
    const school = document.querySelector('#school-input').value;
    const faculty = document.querySelector('#faculty-input').value;
    const level = document.querySelector('#level-input').value;
    const studentsNumber = document.querySelector('#students-input').value;
    const date = document.querySelector('#date').value;
    const days = document.querySelector('#time').value;
    const hours = document.querySelector('#hours').value;
    const module = document.querySelector('#module-title').value;
    const component = document.querySelector('#component').value;
    const activity = document.querySelector('#activity').value;
    const lecturer = document.querySelector('#lecturer').value;
    const observation = document.querySelector('#observation').value;
    
    const dayReport ={
        school,
        faculty,
        level,
        studentsNumber,
        days,
        date,
        hours,
        module,
        component,
        activity,
        lecturer,
        observation
    }
    formValidation(
        school,
        faculty,
        level,
        studentsNumber,
        days,
        date,
        hours,
        module,
        component,
        activity,
        lecturer,
        observation,
        dayReport
    )
})


fetch(`${url}/api/report/all`)
.then(handleResponse)
.then(data =>console.log('success: ' , data))
.catch(error => console.error(error));

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

//clear token when user logout and allow user to return to home page
logoutBnt.addEventListener('click', (e) =>{
    e.preventDefault();
    loadResult.innerHTML = `<div class='load-result'></div>`;
    setTimeout(() =>{
        loadResult.innerHTML = '';
        localStorage.removeItem('UserToken');
        location.href = './users-login.html'; 
    }, 5000);   
})