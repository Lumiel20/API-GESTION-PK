const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')


const app = express()
const port = process.env.PORT || 3000

app  //Middleware
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
    res.json('hello heroku')
} )

// ici nous placerons nos futur terminaisons
 require('./src/routes/findAllPokemon')(app)
 require('./src/routes/findPokemonByPk')(app)
 require('./src/routes/createPokemon')(app)
 require('./src/routes/updatePokemon')(app)
 require('./src/routes/deletePokemon')(app)
 require('./src/routes/login')(app)

// Gestion des erreur 404
app.use(({res}) => {
    const message = 'impossible de trouver la ressource demendée! vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`notre premier app node est demarré sur : http://localhost:${port}`))