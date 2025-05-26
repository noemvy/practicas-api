/*4. API de Reservas de Restaurante 
Implementa una API en Express que gestione reservas. Cada reserva tiene: id, nombre_cliente, personas, fecha. 
Debes permitir: - Ver todas las reservas (GET /reservas) - Crear una nueva reserva (POST /reservas)
 - Validar que el número de personas sea mayor que 0 - Devolver error si falta algún dato obligatorio  */

const express = require("express");
const app = express();
puerto = 1700;

app.use(express.json());

//Arreglos vacios
let reservas = [];
let indice = 1;

//GET
app.get("/reservas", (req, res) => {
return res.status(200).json({ reservas });
});

//POST
app.post("/reservas", (req, res) => {
  //datos a ingresar id, nombre_cliente, personas, fecha.
const { nombre_cliente, personas, fecha } = req.body;

//Validar que sean todos los campos obligatorios
if(!nombre_cliente|| !personas || !fecha){
return res.status(400).json({error:'Llene todos los campos porfavor.'})
}


//Validar que sea un numero entero y que sea mayor a 0
if (!Number.isInteger(personas)||personas <= 0) {
    return res.status(400).json({ error: "Ingrese una cantidad de personas valida" });
}

let reservaNueva = {
    id: indice++,
    nombre_cliente,
    personas,
    fecha,
};
reservas.push(reservaNueva)
return res.status(200).json({ reservaNueva });
});

app.listen(puerto, () => {
  console.log("corriendo ejercicio 4");
});
