const btn = document.querySelector('.register');

const data =[];
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
    data.push(signupData);
    localStorage.setItem('usersSignup', JSON.stringify(data))

    fetch('http://localhost:3000/api/v1/users/register',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(signupData)
    })
    .then(handleResponse)
    .then(result => console.log('sucess:', result))
    .catch(error => console.log(error))
});

function handleResponse(response){
    let contentType = response.headers.get('content-type');
    if(contentType.includes('application/json')){
        return response;
    }else if(contentType.includes('text/html')){
        return response;
    }else{
        throw new Error (`content-type ${contentType} not supported`)
    }
}