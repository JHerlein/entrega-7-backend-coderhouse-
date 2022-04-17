const express = require('express');
const fs = require('fs')
const app = express();
const router = require('./routes/products')
const {getAllProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
} = require('./controllers/products')

const {options} = require('./options/sqliteDB')
var knex = require('knex')(options)


const {Server: IOServer} = require('socket.io')
const {Server: HttpServer} = require('http');
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const port = 8080

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/products',router)
app.use(express.static('./public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')




httpServer.listen(port,console.log(`Listening on port ${port}`))


const getAllMensajes = async () => {    
    try {
        console.log('Se conecto al SQLite3')
        let rows = await knex.from('mensajes').select('*')
        return rows
    } catch (error) {
        console.log(error)  
    }    
}
    

const createMensaje = async (mensaje) => {
    try {        
        await knex('mensajes').insert(mensaje)        
        rows = await knex.from('mensajes').select('*')        
        return rows
    } catch (error) {
        console.log(error)       
    }
}

let messages = getAllMensajes()


app.get('/products',(req,res) => {    
    res.render('products.html')
})


io.on('connection', async (socket) => {
    console.log('Usuario conectado')
    socket.emit('render','')    
    socket.emit('messages',await messages.then(data => {return data}))       
    socket.on("productAdded", (data) => {
        console.log("Recibi producto agregado")        
        io.sockets.emit('newProduct','Nuevo producto agregado')
    });
    socket.on('new-message', async data => { 
        console.log('Agregar mensaje')       
        messages = createMensaje(data)
        io.sockets.emit('messages',await messages.then(data => {return data}))
    });
})

