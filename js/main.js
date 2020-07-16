
const btn = document.querySelector('.btn');


const data = [];

btn.addEventListener('click', () =>{
    const school = document.querySelector('#school-input').value;
    const faculty = document.querySelector('#faculty-input').value;
    const level = document.querySelector('#level-input').value;
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
        days,
        date,
        hours,
        module,
        component,
        activity,
        lecturer,
        observation
    }
    data.push(dayReport);
    localStorage.setItem('Report', JSON.stringify(data));

    fetch('http://localhost:3000/api/v1/report',{
    method:'post',
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify(dayReport)
})
.then(handleResponse)
.then(data => console.log('success: ', data))
.catch(error => console.log(error))
})


fetch('http://localhost:3000/api/v1/report/all')
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

