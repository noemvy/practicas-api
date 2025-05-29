/*9. API de Gestión de Inventario 
Implementa una API para administrar inventario de productos. 
Cada producto: id, nombre, stock, precio. 
Funciones: - Listar inventario completo (GET /inventory) 
- Agregar producto (POST /inventory) 
- Validar que stock y precio sean números positivos 
- Manejar errores si el producto no existe*/

const express = require('express')
const app = express()
const puerto = 1700

app.use(express.json())


let inventario = []
let indice = 1
//GET
app.get('/inventory',(req,res)=>{
    return res.status(200).json(inventario)
})

//POST
app.post('/inventory',(req,res)=>{
    const {nombre, stock,precio} = req.body
    if (!Number.isInteger(stock) || stock < 0) {
        return res.status(400).json({ Error: 'Ingrese una cantidad válida para el stock' });
    }

    if (typeof precio !== 'number' || isNaN(precio) || precio < 0) {
        return res.status(400).json({ Error: 'Ingrese una cantidad válida para el precio' });
    }
    let productos = {
        id: indice++,
        nombre,
        stock,
        precio
    }

    inventario.push(productos)
    return res.status(200).json(productos)
})

app.get('/inventory/:nombre',(req,res)=>{
    const nombre = req.params.nombre
    let productoEncontrado = inventario.find((elemento)=>elemento.nombre === nombre)
    if (!productoEncontrado){
        return res.status(400).json('Producto no encontrado, intentelo de nuevo')
    }
    return res.status(200).json(productoEncontrado)
})

app.listen(puerto,()=>{
    console.log('Corriendo ejercicio 9...')
})