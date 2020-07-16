

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
