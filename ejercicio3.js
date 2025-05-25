/*3. API de Tareas Pendientes
Crea una API para gestionar tareas de un usuario. Cada tarea contiene: id, descripcion, completada (true/false).
Implementa lo siguiente:
- Listar todas las tareas (GET /tasks)
- Agregar una nueva tarea (POST /tasks)
- Filtrar solo las tareas completadas (GET /tasks/completed)
- Validar que la descripción no esté vacía
- Manejar errores si se intenta agregar una tarea sin descripción */
const express = require('express')
const app = express()
const puerto = 1700

app.use(express.json())

let tareas = []
let indice = 1

//GET
app.get('/tasks', (req, res)=>{
    return res.status(200).json({tareas})
})


//POST
app.post('/tasks',(req,res)=>{
    const {descripcion,completada} = req.body
    if (!descripcion){
        return res.status(400).json({error:'La tarea debe llevar una descripcion'})
    }

    const listaTarea={
        id: indice++,
        descripcion,
        completada: completada === true // por si no se envía
    }

    tareas.push(listaTarea)
    return res.status(200).json({tareas})
})


//Tareas completadas
app.get('/tasks/completed',(req,res)=>{
    const tareaCompletada = tareas.filter((elemento)=>elemento.completada===true)
    if (tareaCompletada.length === 0) {
        return res.status(404).json({ error: 'No hay tareas completadas por el momento' })
    }

    return res.status(200).json({tareaCompletada})
})


app.listen(puerto,()=>{
    console.log('corriendo ejercicio 3')
})
