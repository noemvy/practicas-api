/*7. API de Mensajes de Chat 
Desarrolla una API para enviar y recibir mensajes de chat. 
Cada mensaje contiene: id, usuario, mensaje y 
timestamp. 
Funcionalidades: 
- Obtener todos los mensajes (GET /chat) 
- Enviar un mensaje (POST /chat) 
- Filtrar mensajes de un usuario específico (GET /chat/:usuario) 
- Validar que el mensaje no esté vacío */
const express = require('express')
const app = express()
const puerto = 1700

app.use(express.json())

let mensajes = []
let indice = 1


// Función para obtener fecha y hora formateada
function getFormattedDateTime() {
const now = new Date();
  return now.toLocaleString('es-PA', { hour12: true }); 
}

//GET
app.get('/chat',(req,res)=>{
    return res.status(200).json({mensajes})
})

//POST
app.post('/chat',(req,res)=>{
    const {usuario, mensaje} = req.body

    if(!mensaje){
        return res.status(400).json({Error: 'El mensaje no puede ir vacio'})
    }

    let nuevoMensaje = {
        id: indice++,
        usuario,
        mensaje,
        createdAt: getFormattedDateTime(),
    }
    mensajes.push(nuevoMensaje)
    return res.status(200).json({nuevoMensaje})
})

//FILTRAR MENSAJES POR USUARIO
app.get('/chat/:usuario',(req,res)=>{
const usuario = req.params.usuario;
let mensajesFiltrados = mensajes.filter((elemento)=>elemento.usuario === usuario )

return res.status(200).json(mensajesFiltrados)
})



app.listen(puerto, ()=>{
    console.log('Corriendo Ejercicio 7...')
})