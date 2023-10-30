const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Gestor = db.define('gestor', {
    nome:  {
        type: DataTypes.STRING(100)
    },
    email: {
        type: DataTypes.STRING(100)
    }, 
    senha: {
        type: DataTypes.STRING(100)
    }
},{
    createdAt: false,
    updatedAt: false
})

// Gestor.sync({force:true})
module.exports = Gestor