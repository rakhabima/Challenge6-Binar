const inputSkor = async(userGameId) => {
    const skor = document.getElementById("skor-form").value

    const resp = await fetch('http://localhost:3000/user_game_history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            skor: skor,
            userGameId: userGameId
        })
    })

    console.log("Data Created")
    location.reload()
}

const deleteSkor = async(historyId) => {
    const resp = await fetch(`http://localhost:3000/user_game_history/${historyId}`, {
        method: 'DELETE'
    })
    console.log("Data deleted")
    location.reload()
}