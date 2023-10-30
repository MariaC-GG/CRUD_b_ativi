const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Atividade = db.define('atividade', {
    codigo: {
        type: DataTypes.STRING(30)
    },
    nome:  {
        type: DataTypes.STRING(100)
    }
},{
    createdAt: false,
    updatedAt: false
})

// Atividade.sync({force:true})
module.exports = Atividade