const { Pokemon } = require('../db/sequelize')
const pokemon = require('../models/pokemon')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', auth, (req, res) => {

        Pokemon.findByPk(req.params.id).then(pokemon => {
            if (pokemon === null) {
                const message = 'Le pokemon  demander n\'existe pas Réessayez un autre identifiant'
                return res.status(404).json({ message })
            }
            const pokemonDeleted = pokemon
            return pokemon.destroy({
                where: { id: pokemon.id }
            })
                .then(_ => {
                    const message = `le pokemon ${pokemonDeleted.id} a bien ete supprimer`
                    res.json({ message, data: pokemonDeleted })
                })
        })
            .catch(error => {
                const message = 'Le pokemon n\'a pas pus etre recuperé Réessayez dans quelques instants'
                res.status(500).json({ message, data: error })
            })
    })
}