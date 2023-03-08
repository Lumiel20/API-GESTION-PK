const validTypes = ['Plante', 'Poisson', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik' , 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:{
                msg: 'Le nom est deja pris'
            },
            validate: {
                notEmpty: { msg: 'Le nom du pokemon ne doit pas être une chaine vide.' },
                notNull: { msg: 'Le nom du pokemon est une propriété requise.' }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
                min: {
                    args: [0],
                    msg: 'Les points de vie doivent être supérieurs ou egal à 0'
                },
                max: {
                    args: [999],
                    msg: 'Les points de vie doivent être inférieurs ou egal à 999'
                },
                notNull: { msg: 'Les points de vie sont une propriété requise.' },
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de degât.' },
                min: {
                    args: [0],
                    msg: 'Les points degâts doivent être supérieurs ou egal à 0'
                },
                max: {
                    args: [99],
                    msg: 'Les points degâts doivent être inférieurs ou egal à 99'
                },
                notNull: { msg: 'Les degâts sont une propriété requise.' }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: 'Utilisez uniquement l\'Url valide pour les images.' },
                notNull: { msg: 'L\'image sont une propriété requise.' }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                    if (!value) {
                     throw new Error('Un pokemon doit moins avoir un type.')  
                    }
                    if (value.split(',').length > 3) {
                        throw new Error('Un pokemon ne peut pas avoir plus de trois un type.')
                    }
                    value.split(',').forEach((type) => {
                          if (!validTypes.includes(type)) {
                           console.error(`Le type d'un pokemon doit appartenir à la liste suivante: ${validTypes}`)  
                          }
                    })
                },
            }
        },
    }, {
        timestamps: true,
        createdAt: 'created',
        updateAt: false
    })
} 