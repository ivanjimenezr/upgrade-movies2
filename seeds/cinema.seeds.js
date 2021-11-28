// requerimos la libreria mongoose
const mongoose = require('mongoose');

// requerimos el modelo con el que construiremos los datos 
const Cinema = require('../models/Cinema');

// requerimos la conexion de la base de datos
const dbConnection = require('../utils/db')

// definimos datos para meter en la base de datos
const cines = [
    {
        name : 'Xanadu',
        location : 'Paseo de la montaña 30',
        movies : ''
    },
    {
        name : 'Princesa',
        location : 'Plaza de los Cubos 45',
        movies : ''
    }
];

// mapeamos la coleccion en base al modelo
const cinesDocuments = cines.map(cine => new Cinema(cine));

// comenzamos el borrado e inserción en la base de datps
dbConnection
    .then(async() => {

        // Utilizando Movie.find() obtendremos un array con todos las peliculas de la db
        const allCines = await Cinema.find();
        // Si existen peliculas previamente, dropearemos la colección
       if (allCines.length){
        await Cinema.collection.drop(); //La función drop borra la colección
       }
    })
    .catch((err) => console.log(`Error borrando data: ${err}`))
    .then(async()=>{
        // Una vez vaciada la db de las peliculas, usaremos el array movieDocuments
	    // para llenar nuestra base de datos con todas las peliculas.
        await Cinema.insertMany(cinesDocuments)
    })
    .catch((err) =>console.log(`Error creando data: ${err}`))
    .finally(() => mongoose.disconnect())