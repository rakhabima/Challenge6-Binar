const  superAdminValidation = async () => {
    const username = document.getElementById("username-input").value
    const password = document.getElementById("password-input").value
    const resp = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    if(resp.status != 401){
        location.href ='http://localhost:3000/users'
    } else{
        alert('password salah')
    }
}