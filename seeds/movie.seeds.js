// requerimos la libreria mongoose
const mongoose = require('mongoose');
// requerimos el modelo con el que construiremos los datos 
const Movie = require('../models/Movie');
// requerimos la conexion de la base de datos
const dbConnection = require('../utils/db')

// definimos datos para meter en la base de datos
const movies = [
    {
      title: 'The Matrix',
      director: 'Hermanas Wachowski',
      year: 1999,
      genre: 'Acción',
    },
    {
      title: 'The Matrix Reloaded',
      director: 'Hermanas Wachowski',
      year: 2003,
      genre: 'Acción',
    },
    {
      title: 'Buscando a Nemo',
      director: 'Andrew Stanton',
      year: 2003,
      genre: 'Animación',
    },
    {
      title: 'Buscando a Dory',
      director: 'Andrew Stanton',
      year: 2016,
      genre: 'Animación',
    },
    {
      title: 'Interestelar',
      director: 'Christopher Nolan',
      year: 2014,
      genre: 'Ciencia ficción',
    },
    {
      title: '50 primeras citas',
      director: 'Peter Segal',
      year: 2004,
      genre: 'Comedia romántica',
    },
  ];

  // mapeamos la coleccion en base al modelo
  const moviesDocumnts = movies.map(movie => new Movie(movie));

// comenzamos el borrado e inserción en la base de datps
dbConnection // llamamos a la conexion a la bbdd (es una promesa)
  .then(async() =>{
      // Utilizando Movie.find() obtendremos un array con todos las peliculas de la db
      const allMovies = await Movie.find(); //buscamos si hay datos en la coleccion

      // Si existen peliculas previamente, dropearemos la colección
      if (allMovies.length){
          await Movie.collection.drop(); //La función drop borra la colección
      }
  })
  .catch((err)=>console.log(`Error borrando data: ${err}`))
  .then(async()=>{
      // Una vez vaciada la db de las peliculas, usaremos el array movieDocuments
	  // para llenar nuestra base de datos con todas las peliculas.
      await Movie.insertMany(moviesDocumnts);
  })
  .catch((err)=>console.log(`Error creando data: ${err}`))
  // Por último nos desconectaremos de la DB.
  .finally(()=> mongoose.disconnect())