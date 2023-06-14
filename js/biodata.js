const createBiodata = async(userGameId) => {
    const nama = document.getElementById("form-nama").value
    const alamat = document.getElementById("form-alamat").value
    const ttl = document.getElementById("form-ttl").value
    const gender = document.getElementById("form-gender").value

    const resp = await fetch('http://localhost:3000/user_game_biodata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nama: nama,
            alamat: alamat,
            tanggalLahir: ttl,
            jenisKelamin: gender,
            userGameId: userGameId
        })
    })

    console.log("Data Created")
}

const updateBiodata = async(bioId) => {
    const nama = document.getElementById("form-nama").value
    const alamat = document.getElementById("form-alamat").value
    const ttl = document.getElementById("form-ttl").value
    const gender = document.getElementById("form-gender").value

    const resp = await fetch(`http://localhost:3000/user_game_biodata/${bioId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nama: nama,
            alamat: alamat,
            tanggalLahir: ttl,
            jenisKelamin: gender
        })
    })

    console.log("Data Updated")
}
