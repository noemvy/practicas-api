/*5. API de Productos de Tienda 
Crea una API para administrar un catálogo de productos. 
Cada producto tendrá: id, nombre, precio, disponible. 
Implementa: - Listar todos los productos (GET /productos) 
- Agregar un nuevo producto (POST /productos) 
- Mostrar solo los productos disponibles (GET /productos/disponibles) 
- Validar que el precio sea mayor que cero 
- Manejar errores si se envía un producto sin nombre o con precio inválido  */
const express = require("express");
const app = express();
const puerto = 1700;
app.use(express.json());


let productos = []
let indice = 1
//GET
app.get('/productos',(req,res)=>{
    return res.status(200).json({productos})
})

//POST
app.post('/productos',(req,res)=>{
    const {nombre, precio,disponible} = req.body

    if(!nombre){
        return res.status(400).json({error:'Ingrese un nombre para el producto'})
    }

    if(!Number.isInteger(precio)){
        return res.status(400).json({error:'Ingrese un precio en decimales'})
    }

    let nuevoProducto ={
        id:indice++,
        nombre,
        precio,
        disponible
    }

    productos.push(nuevoProducto)
    return res.status(200).json({nuevoProducto})
})

//GET Disponibilidad de productos
app.get('/productos/disponible',(req,res)=>{
    let productoDisponible = productos.filter((elemento)=>elemento.disponible===true)
    if(productoDisponible.length===0){
        return res.status(400).json({error: 'No hay productos disponibles'})
    }

        return res.status(200).json({productoDisponible})
})


app.listen(puerto,()=>{
    console.log('Corriendo ejercicio5')
})