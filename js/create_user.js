const createUser = async() => {
    const nama = document.getElementById("form-nama").value
    const alamat = document.getElementById("form-alamat").value
    const ttl = document.getElementById("form-ttl").value
    const gender = document.getElementById("form-gender").value
    const username = document.getElementById("form-username").value
    const password = document.getElementById("form-password").value
    const email = document.getElementById("form-email").value

    const resp = await fetch('http://localhost:3000/create_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nama: nama,
            alamat: alamat,
            tanggalLahir: ttl,
            jenisKelamin: gender,
            username: username,
            password: password,
            email: email
        })
    })

    console.log("Data Updated")
}