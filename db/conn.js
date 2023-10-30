const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('atividade_back_01', 'root', 'senai',{
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log('banco conectado')
// }).catch((error)=>{
//     console.error('banco não conectado' , error)
// })

module.exports = sequelize
  