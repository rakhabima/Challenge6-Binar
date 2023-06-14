const redirectBiodata = (userId) => {
    location.href =`http://localhost:3000/biodata/${userId}`
}

const redirectHistory = (userId) => {
    location.href =`http://localhost:3000/history/${userId}`
}

const deleteUsername = async(userId, historyId, biodataId) => {
    const userDelete = await fetch(`http://localhost:3000/user_game/${userId}`, {
        method: 'DELETE'
    })
    console.log("Data deleted")
    location.reload()
}

const redirectCreateUser = () => {
    location.href = "http://localhost:3000/create_user"
}