/*1. API de Registro de Estudiantes
Crea una API REST en Express.js para registrar estudiantes en una universidad. El sistema debe permitir:
- Obtener la lista completa de estudiantes (GET /students)
- Registrar un nuevo estudiante (POST /students)
- Validar que el nombre y la carrera no estén vacíos
- Cada estudiante debe tener: id, nombre, edad, carrera */


const express = require('express')
const app = express()
const puerto = 1700

app.use(express.json())

let estudiantes = []
let indice = 1;



//GET
app.get('/students', (req, res)=>{

    return res.status(200).json({estudiantes})
})

//POST 
app.post('/students' ,(req, res)=>{
    const {nombre, edad, carrera} = req.body; 

    if (!nombre || !carrera){
        return res.status(400).json({error: 'El nombre y la carrera son obligatorios'})
    }

    const agregandoEstudiante = {
        id: indice++,
        nombre,
        edad,
        carrera
    }

    estudiantes.push(agregandoEstudiante)
    res.status(200).json(agregandoEstudiante)

})

app.listen(puerto,()=>{
    console.log(`Corriendo ..`)
    })