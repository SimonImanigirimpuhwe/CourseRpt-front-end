const btn = document.querySelector('button');

const data =[];

btn.addEventListener('click', (e)=>{
    e.preventDefault()
    const regNumber = document.querySelector('input').value;
    
    const loginData ={
        regNumber,
    }
    data.push(loginData);
    localStorage.setItem('users', JSON.stringify(data))
    fetch('http://localhost:3000/api/v1/users/login', {
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(loginData)
    })
    .then(handleResponse)
    .then(result => console.log('sucess:', result))
    .catch(error => console.log(error))
});

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