const errorResult = document.querySelector('.error');
const errorSearch = document.querySelector('.search-error');
const searchInput = document.querySelector('#search');
const viewReport = document.querySelector('.view-report');

const adminToken = JSON.parse(localStorage.getItem('loginToken'));

const url ='https://t-progress-report.herokuapp.com';

//function to fetch all reports in DB
function displayReport(){
        errorSearch.style.visibility = 'hidden';
        fetch(`${url}/api/report/all`, {
        method:'GET',
        headers:{
            'content-type':'application/json',
            'authentication':adminToken
        }
        })
        .then(handleResponse)
        .then(handleData)
        .catch(error =>{
            errorResult.style.color = '#a90505';
            errorResult.innerHTML = 'Something went wrong, try again!'
        });
}  

//Response type checking 
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
function handleData(data){
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
            const result = document.querySelector('.result')
            const mapped = data.map(element => {
                return `
                <div class='search-result'>
                <tr><span>School</span>: ${element.school}</tr><br>
                <tr><span>Faculty</span>: ${element.faculty}</tr><br>
                <tr><span>Class Level</span>: ${element.level}</tr><br>
                <tr><span>Number of students</span>: ${element.studentsNumber}</tr><br>
                <tr><span>Day</span>: ${element.days}</tr><br>
                <tr><span>Date</span>: ${element.date}</tr><br>
                <tr><span>Hours</span>: ${element.body.hours}</tr><br>
                <tr><span>Module</span>: ${element.body.module}</tr><br>
                <tr><span>Component</span>: ${element.body.component}</tr><br>
                <tr><span>Activity</span>: ${element.body.activity}</tr><br>
                <tr><span>Name of lecturer</span>: ${element.body.lecturer}</tr><br>
                <tr><span>Observation</span>: ${element.body.observation}</tr><br>
                <tr><span>Submission time</span>: ${element.submittedAt}</tr><br>
                </div>
                `
            });
        result.innerHTML = mapped;
        }
}

//event fire to display all reports
viewReport.addEventListener('click', displayReport)



/**
 Search report in database
 */
function searchReport(){
    errorSearch.style.visibility = 'visible';
    fetch(`${url}/api/report/search`,{
        method:'POST',
        headers:{
            'content-type':'application/json',
            'authentication':adminToken
        },
        body:JSON.stringify({
            field:searchInput.value
        })
    })
    .then(handleResponse)
    .then(handleFoundData)
    .catch(error =>{
        errorSearch.style.color ='#a90505';
        errorSearch.innerHTML = 'Something went wrong, try again!'
    })
}

function handleFoundData(result){
    if(!adminToken){
        errorSearch.style.color = '#a90505';
        errorSearch.innerHTML = 'Access Denied';
        return false;
    }
    if(result.error){
        errorSearch.style.color = '#a90505';
        errorSearch.innerHTML = result.error;
        return false;
    }else{
    
        const found = document.querySelector('.found-search-result');
        const foundData = result.map(element =>{
            return `
            <div class='found-result'>
            <tr><span>School</span>: ${element.school}</tr><br>
            <tr><span>Faculty</span>: ${element.faculty}</tr><br>
            <tr><span>Class Level</span>: ${element.level}</tr><br>
            <tr><span>Number of students</span>: ${element.studentsNumber}</tr><br>
            <tr><span>Day</span>: ${element.days}</tr><br>
            <tr><span>Date</span>: ${element.date}</tr><br>
            <tr><span>Hours</span>: ${element.body.hours}</tr><br>
            <tr><span>Module</span>: ${element.body.module}</tr><br>
            <tr><span>Component</span>: ${element.body.component}</tr><br>
            <tr><span>Activity</span>: ${element.body.activity}</tr><br>
            <tr><span>Name of lecturer</span>: ${element.body.lecturer}</tr><br>
            <tr><span>Observation</span>: ${element.body.observation}</tr><br>
            <tr><span>Submission time</span>: ${element.submittedAt}</tr><br>
            </div>
            `
        })
        found.innerHTML = foundData;
    }
}
searchInput.addEventListener('change', searchReport)
// searchInput.addEventListener('keyup', searchReport)


//clear token when admin logged out
const logoutBtn = document.querySelector('.logout');

logoutBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    localStorage.removeItem('loginToken');
    location.href ='./admin-login.html';
});


//Add functionalities to make Navigation Bar responsive
const spanIncon = document.querySelector('.span');
const hamberg = document.querySelector('.fa-bars');
const menu = document.querySelector('.menu')
const body = document.querySelector('body');
const searchFa = document.querySelector('.fa-search');

searchFa.addEventListener('click', () =>{
    searchInput.classList.toggle('visibleIncon');
})

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
        console.log('Small')
    }
    if (e.target.classList.contains('fa-times')) {
        spanIncon.innerHTML = `<span class='fas span'><i class='fas fa-bars'></i></span>`;
        menu.className = 'menu';

    }
})