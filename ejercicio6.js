/*6. API de Autenticación de Usuarios 
Construye una API en Express.js para autenticar usuarios. El sistema debe: 
- Registrar usuarios con email y password en memoria (POST /auth/register) 
- Iniciar sesión validando credenciales (POST /auth/login) 
- Manejar errores de registro (email duplicado)
 y login (credenciales inválidas) - Validar formato de email y longitud mínima de password */

 const express = require('express')
 const app = express()
 puerto = 1700

 app.use(express.json())

let usuarios = []

//POST para guardar usuario
app.post('/auth/register', (req, res)=>{
    const {email, contraseña} = req.body

    //Validacion para que email y contraseña sean obligatorios al llenar
    if(!email || !contraseña){
        return res.status(400).json({error:'Nombre y cotraseña son obligatorios'})
    }

    //Validacion de correo
    function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
    }

    if(!esEmailValido(email)){
        return res.status(400).json({error:'Ingrese un correo valido'})
    }

    //Validacion longitud de contraseña
    if(contraseña.length < 6){
        return res.status(400).json({error:'La contraseña debe tener un maximo de 6 caracteres'})
    }

     //Validacion de email duplicado
    let emailDuplicado = usuarios.find((elemento)=>elemento.email ===email)
    if(emailDuplicado){
        return res.status(400).json({error:'El correo que ingreso ya esta en uso. Ingrese uno nuevo'})
    }

    //Agregar Usuario
    const usuarioAgregado = {
        email,
        contraseña
    }
    usuarios.push(usuarioAgregado)
    return res.status(200).json({usuarioAgregado})
})


//POST LOGIN
app.post('/auth/login',(req,res)=>{
    const {email, contraseña} = req.body
    let usuarioLogeado = usuarios.find((elemento)=>elemento.email===email && elemento.contraseña === contraseña)
    if(!usuarioLogeado){
        return res.status(401).json({error:'Credenciales incorrectos. Intente de Nuevo'})
    } 
    return res.status(200).json({mensaje:'Inicio de Sesion exitoso!'})
})

app.listen(puerto,()=>{
    console.log('Corriendo ejercicio 6')
})