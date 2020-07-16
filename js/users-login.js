const btn = document.querySelector('button');
const loadData = document.querySelector('.load-result');
const errorResult = document.querySelector('.error-display');


const postData = (data) =>{
    loadData.innerHTML = `<div class="result"></div>`
  
    fetch('http://localhost:3000/api/v1/users/login', {
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
            localStorage.setItem('UserToken', JSON.stringify(result.token));
            location.href ='./report.html'
        }, 5000)
        
       
        console.log('sucess:', result)  
    }
}


const inputValidation = (reg,obj)=>{
    if(reg.length != 9){
        errorResult.style.color='red';
        errorResult.innerHTML = `Please enter a valid regNumber`;
        return false;
    }else{
        postData(obj)
    }
}

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const regNumber = document.querySelector('input').value;
    
    const loginData ={
        regNumber,
    }

    inputValidation(
        regNumber,
        loginData
    )
    // data.push(loginData);
    // localStorage.setItem('users', JSON.stringify(data))
});