const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
//const pokemon = require('../models/pokemon.js')

const sequelize = new Sequelize('pokedex', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2',
    },
    logging: true
})


//instanciation de Pokemon model auprès de sequelize
const Pokemon = PokemonModel(sequelize, DataTypes)
//instanciation de User model auprès de sequelize
const User = UserModel(sequelize, DataTypes)

//synchronisée 
const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then(pokemon => console.log(pokemon.toJSON()))
        })

        bcrypt.hash('pikachu', 10)
            .then(hash => {
                User.create({
                    username: 'pikachu',
                    password: hash
                })
            })
            .then(user => console.log(user.toJSON()))
            .catch(error => console.error(error))
        console.log('la base de donnée pokedex a été bien initialisé.')
    })
}

module.exports = {
    initDb, Pokemon, User
} 