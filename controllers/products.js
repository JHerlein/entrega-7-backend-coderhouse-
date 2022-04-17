const fs = require('fs')
const {options} = require('../options/mariaDB')
let knex = require('knex')(options)
 

const getAllProducts = async (req,res) => {         
    try {
        console.log('Se conecto a MariaDB')
        let file = await knex.from('productos').select('*')            
        res.status(200).json(JSON.parse(JSON.stringify(file)))              
    } catch (error) {
        res.send(error)
    }        
}

const getProduct = async (req,res) => {
    try {
        const {id:productID} = req.params
        let file = await knex.from('productos').select('*').where('id',"=",productID)            
        res.status(200).json(JSON.parse(JSON.stringify(file[0])))
    } catch (error) {
        res.send(error)
    }   
}

const createProduct = async (req,res) => {       
    try {        
        const newProduct = req.body
        await knex('productos').insert(newProduct)
        console.log(newProduct)        
        res.redirect('/')
    } catch (error) {
        res.send(error)
    } 
}

const editProduct = async (req,res) => {
    try {
        const {id:productID} = req.params
        const {title,price,thumbnail} = req.body
        await knex('productos').where('id','=',productID).update({
            title:title,
            price:price,
            thumbnail:thumbnail})

        let file = await knex.from('productos').select('*').where('id',"=",productID)            
        res.status(200).json(JSON.parse(JSON.stringify(file[0])))       
        
    } catch (error) {
        console.log(error)
    }
    
}

const deleteProduct = async(req,res) => {
    try {
        const {id:productID} = req.params
        const {title,price,thumbnail} = req.body
        await knex('productos').where('id','=',productID).del()
        let file = await knex.from('productos').select('*')          
        res.status(200).json(JSON.parse(JSON.stringify(file)))
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getAllProducts,
                getProduct,
                createProduct,
                editProduct,
                deleteProduct}