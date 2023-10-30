const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Gestor = require('./models/Gestor')
const Atividade = require('./models/Atividade')

const PORT = 3000
const hostname = 'localhost'
let log = false
// ------------ express --------------------
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
// ----------- express Handlebars -----------
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
// -------------------------------------------
// login
app.post('/login', async (req,res)=>{
    const email = req.body.email
    const senha = req.body.senha

    console.log(email,senha)

    const pesq = await Gestor.findOne({raw: true, where: {email: email, senha: senha}})
    console.log(pesq)
    if(pesq == null){
        log = false
        res.render('login', {log})
    }else{
        log = true
        res.render('sistema', {log, nome:pesq.nome})
    }
    
})

// Cadastrar
app.post('/cadastrar', async (req,res)=>{
    const nome = req.body.nome
    const codigo = req.body.codigo
    const msg = "Usuário cadastrado"

    // console.log(nome, idade, email, senha)
    await Atividade.create({codigo,nome})

    res.render('cadastrar', {log, msg})
    // res.redirect('/listar')
})
app.get('/cadastrar', (req,res)=>{
    res.render('cadastrar',{log})
})

// atualizar
app.post('/atualizar', async (req,res)=>{
    const codigo = req.body.codigo
    const nome = req.body.nome
    let msg = "Atividade alterada"

    const pesq = await Atividade.findOne({raw: true, where: {codigo: codigo}})
    console.log(pesq)

    const dados = {
        codigo: codigo,
        nome: nome
    }
    console.log(dados)
    
    if(pesq == null){
        let msg = "Código da atividade não encontrado"
        res.render('atualizar', {log, msg})
    }else{
        await Atividade.update(dados,{where: {codigo: pesq.codigo}})
        res.render('atualizar', {log, msg})
    }
})

app.get('/atualizar', (req,res)=>{
    res.render('atualizar', {log})
})

// listar
app.get('/listar', async (req, res)=>{
    const dados = await Atividade.findAll({raw:true})
    console.log(dados.nome)
    res.render('listar', {dados:dados})
})
 

// apagar
app.post('/excluir', async (req,res)=>{
    const codigo = req.body.codigo
    const pesq = await Atividade.findOne({raw:true, where: {codigo:codigo}})
    console.log(pesq)
    const msg = "Usuário excluído"
    Atividade.destroy({raw:true, where: {codigo:codigo}})

    res.render('excluir', {log, msg})
})

app.get('/excluir', (req,res)=>{
    res.render('excluir', {log})
})



// principal
app.get('/', (req,res)=>{
    log = false
    res.render('login',{log})
})
// -------------------------------------------
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`O servidor está rodando ${hostname}:${PORT}`)
    })
}).catch((error)=>{
    console.error('Erro de conexão com o Banco de dados'+error)
})