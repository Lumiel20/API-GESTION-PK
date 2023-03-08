const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
        const message = `Vous n'avez pas fournis de jeton d'authentification ajouter en un dans l'entête de le requête`
        return res.status(401).json({message})
    }

    const token = authorizationHeader.split(' ') [1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if (error) {
         const message = ` L'utilisateur n'est pas authorisé a accéder a cette ressource`   
         return res.status(401).json({message, data: error})
        }

        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            const message = ` L'identifiant de l'utilisateur est invalide`   
          res.status(404).json({message})
        } else {
            next()
        }
    })
}