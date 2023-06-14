const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const {user_game, user_game_biodata, user_game_history} = require('./models')
const fetch = require("node-fetch");

const jsonParser = bodyParser.json()
const app = express()

app.use('/css', express.static(__dirname+'/css'))
app.use('/assets', express.static(__dirname+'/assets'))
app.use('/bootstrap-5.2.0-beta1-dist', express.static(__dirname + '/bootstrap-5.2.0-beta1-dist'))
app.use('/js', express.static(__dirname+'/js'))
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')

// DISPLAY 
app.get('/',(req, res) => {
    res.send('hello world')
})

app.get('/biodata/:id', async(req, res) => {
    const resp = await fetch(`http://localhost:3000/user_game/${req.params.id}`)
    const data = await resp.json()

    res.render("biodata", { css: "/css/biodata.css", js: "/js/biodata.js", title: "biodata", data: data})
})

app.get('/history/:id', async(req, res) => {
    const resp = await fetch(`http://localhost:3000/user_game/${req.params.id}`)
    const data = await resp.json()

    res.render("history", { css: "/css/history.css", js: "/js/history.js", title: "history", data: data})
})

app.get('/login',(req, res) => {
    res.render("login", { css: "/css/login.css", js: "/js/login.js", title: "Super Admin Login"})
})

app.get('/users', async (req, res) => {
    const resp = await fetch('http://localhost:3000/user_game')
    const data = await resp.json()

    res.render("users", { css: "/css/users.css", js: "/js/users.js", title: "Users List", data: data})
})

app.get('/create_user', async (req, res) => {
    res.render("create_user", { css: "/css/create_user.css", js: "/js/create_user.js", title: "Create User" })
})



// CREATE

app.post('/user_game', jsonParser, async (req, res) => {
    const data = await user_game.create ({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    res.status(201).send(data)
})

app.post('/user_game_history', jsonParser, async (req, res) => {
    const data = await user_game_history.create ({
        skor: req.body.skor,
        userGameId: req.body.userGameId
    })
    res.status(201).send(data)
})

app.post('/user_game_biodata', jsonParser, async (req, res) => {
    const data = await user_game_biodata.create ({
        nama: req.body.nama,
        alamat: req.body.alamat,
        tanggalLahir: req.body.tanggalLahir,
        jenisKelamin: req.body.jenisKelamin,
        userGameId: req.body.userGameId
    })
    res.status(201).send(data)
})

app.post('/create_user', jsonParser, async (req, res) => {

    const user = await user_game.create ({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })

    const bio = await user_game_biodata.create ({
        nama: req.body.nama,
        alamat: req.body.alamat,
        tanggalLahir: req.body.tanggalLahir,
        jenisKelamin: req.body.jenisKelamin,
        userGameId: user.id
    })

    res.status(201).send("berhasil")
})


// READ

app.get('/user_game', async (req, res) => {
    const data = await user_game.findAll({
        include: [
            { model: user_game_biodata}, { model: user_game_history}
        ]
    })
    res.send(data)

})

app.get('/user_game_biodata', async (req, res) => {
    const data = await user_game_biodata.findAll()
    res.send(data)

})

app.get('/user_game_history', async (req, res) => {
    const data = await user_game_history.findAll()
    res.send(data)

})

app.get('/user_game_biodata/:id', async (req, res) => {
    const data = await user_game_biodata.findOne({
        where: { id: req.params.id }
    })
    res.send(data)

})

app.get('/user_game/:id', async (req, res) => {
    const data = await user_game.findByPk(req.params.id,{
        include: [
            { model: user_game_biodata}, { model: user_game_history}
        ]
    })
    res.send(data)

})

// UPDATE

app.put('/user_game/:id', jsonParser, async (req, res) => {
    const data = await user_game.update({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    },
    {
        where: { id: req.params.id }
    })
    res.send('Data Updated')

})

app.put('/user_game_biodata/:id', jsonParser, async (req, res) => {
    const data = await user_game_biodata.update ({
        nama: req.body.nama,
        alamat: req.body.alamat,
        tanggalLahir: req.body.tanggalLahir,
        jenisKelamin: req.body.jenisKelamin,
        userGameId: req.body.userGameId
    },
    {
        where: { id: req.params.id }
    })
    res.status(201).send(data)
})

app.put('/user_game_history/:id', jsonParser, async (req, res) => {
    const data = await user_game_history.update ({
        skor: req.body.skor,
        userGameId: req.body.userGameId
    },
    {
        where: { id: req.params.id }
    })
    res.status(201).send(data)
})


// DELETE
app.delete('/user_game/:id', jsonParser, async (req, res) => {
    const data = await user_game.destroy ({ where: { id: req.params.id }})
    res.send('Data Deleted')

})

app.delete('/user_game_biodata/:id', jsonParser, async (req, res) => {
    const data = await user_game_biodata.destroy ({ where: { id: req.params.id }})
    res.send('Data Deleted')

})

app.delete('/user_game_history/:id', jsonParser, async (req, res) => {
    const data = await user_game_history.destroy ({ where: { id: req.params.id }})
    res.send('Data Deleted')

})


// VALIDATION
app.post('/login', jsonParser, (req, res) => {
    const username = 'Ano'
    const password = 'Rizano789'
    if(password == req.body.password && username == req.body.username){
        res.send("Authorized")
      }else{
        res.status(401).send("Unauthorized")
      }
})

app.listen(3000, () => {
    console.log('running at localhost 3000')
})