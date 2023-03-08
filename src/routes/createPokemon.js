const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/pokemons/', auth, (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `le pokemon ${req.body.name} a bien ete creer`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                  return  res.status(400).json({message: error.message, data: error})
                }
                if (error instanceof UniqueConstraintError) {
                    return  res.status(400).json({message: error.message, data: error})
                }
                const message = 'Le pokemon n\'a pas pus etre ajouter Reesayez dans quelques instants'
                res.status(500).json({message, data: error})
            })  
    })
}