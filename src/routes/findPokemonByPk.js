const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons/:id', auth, (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                if (pokemon === null) {
                    const message = 'Le pokemon demandé n\'existe pas Reesayez un autre identifiant'
                    res.status(404).json({ message })
                }
                const message = 'un pokemon a bien ete trouver'
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                const message = 'Le pokemon n\'a pas pus etre recuperé Réessayez dans quelques instants'
                res.status(500).json({ message, data: error })
            })
    })
} 