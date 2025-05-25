/*2. API de Libros Favoritos
Desarrolla una API que permita almacenar libros favoritos.
Cada libro debe tener: id, titulo, autor, anio.
La aplicación debe permitir:
- Obtener todos los libros (GET /books)
- Agregar un nuevo libro (POST /books)
- Mostrar un solo libro por ID (GET /books/:id)
- Manejar errores cuando un libro no se encuentra
- Validar que el año sea un número entero */


const express = require('express')
const app = express()
const puerto = 1700
app.use(express.json())

let libros = []
let indice = 1

//GET
app.get('/books', (req,res)=>{
    return res.status(200).json({libros})
})


//POST
app.post('/books', (req, res)=>{
    const{titulo, autor, anio} = req.body

    if(!titulo || !autor){
        return res.status(400).json({error:'El libro debe tener un titulo y un autor'})
    }
    if(!Number.isInteger(anio)){
        return res.status(400).json({error: 'Ingrese un año correcto'})
    }

    const listaLibritos = {
        id: indice++,
        titulo,
        autor,
        anio
    }

    libros.push(listaLibritos)
    res.status(200).json(listaLibritos)
})


app.get('/books/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    const indiceLibro = libros.find(elemento => elemento.id=== id)
        if (!indiceLibro){
            return res.status(404).json({error: 'Libro no encontrado'})
        }

        return res.status(200).json(indiceLibro)

    })






app.listen(puerto, ()=>{
    console.log('Corriendo ejercicio 2')
})