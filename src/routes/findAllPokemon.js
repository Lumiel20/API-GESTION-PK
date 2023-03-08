const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')


module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        if (req.query.name) {
            const name = req.query.name // recherche strict de pokemon
            const limit = parseInt(req.query.limit) || 5

            if (name.length < 2 ) {
                const message = 'terme de recherche doit contenir au moins 2 caractère'
                return res.status(400).json({message})
            }
            return Pokemon.findAndCountAll({
                where: {
                    name: { //'name' est la propriéte du model pokemon
                        [Op.like]: `%${name}%` //'name' est le critère de la recherche
                    }
                },
                order: ['name'],
                limit: limit
            })
                .then(({count, rows}) => {
                    const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}.`
                    res.json({ message, data: rows })
                })
        } else {
            Pokemon.findAll({order: ['name']})
                .then(pokemons => {
                    const message = 'la liste des pokemons a été bien recuperée'
                    res.json({ message, data: pokemons })
                })
                .catch(error => {
                    const message = `La liste des pokemons n'a pas pu être récupérée. Réesayez dans quelque instants.`
                    res.status(500).json({ message, data: error })
                })
        }
    })
}