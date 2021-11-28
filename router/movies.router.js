const express = require('express');

const router = express.Router();

const Movie = require('../models/Movie')


// GET todas las peliculas
router.get('/', (req, res, next) => {
  return Movie.find()
  .then(movies => {
      // Si encontramos las peliculas, los devolveremos al usuario
      res.status(200).json(movies)
  })
  .catch((err)=>{
      // Si hay un error, enviaremos por ahora una respuesta de error.
      const errorOcurrido = new Error();
      return next(errorOcurrido)
  })
})

// GET pelicula por ID
router.get('/:id',(req, res, next)=>{
  const id = req.params.id;
  Movie.findById(id)
    .then(movie => {
      if (!movie){
        const error = new Error(`La pelicula con el ID ${id}, no existe`);
        error.status = 404;
        return next(error)
      }
      res.json(movie)
    })
    .catch((err)=>{
      return next(new Error())
    })

})

// GET peliculas por su titulo
router.get('/titulo/:titulo', (req, res, next)=>{
  const titulo = req.params.titulo;
  Movie.find({ title: titulo })
    .then(movies => {
      // Si encontramos las peliculas, los devolveremos al usuario
      res.status(200).json(movies)
    })
    .catch((err)=>{
        // Si hay un error, enviaremos por ahora una respuesta de error.
        
        return next(new Error())
    })
})

// GET peliculas por su genero
router.get('/genero/:genero', (req, res, next)=>{
  const genero = req.params.genero;
  Movie.find({ genre: genero })
    .then(movies => {
      // Si encontramos los generos, los devolveremos al usuario
      res.status(200).json(movies)
    })
    .catch((err)=>{
        // Si hay un error, enviaremos por ahora una respuesta de error.
        console.log(`Error en GET /genero/${genero}`, err)
        return next(new Error())
    })
})

// GET peliculas estrenadas a partir de la fecha indicada
router.get('/fecha/:fecha', (req, res, next)=>{
  const fecha = req.params.fecha;
  Movie.find({year:{$gt:fecha}})
    .then(movies => {
      res.status(200).json(movies)
    })
    .catch((err)=>{
      return next(new Error())
    })
})

// POST para crear movies 
router.post('/', (req, res, next) => {
  const newMovie = new Movie({
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    genre: req.body.genre,
  })
  newMovie.save().then(()=>{
    return res.status(201).json(newMovie)
  }).catch((error)=>{
    return next(error);
  })
})

// DELETE para borrar una movie
router.delete('/:id', (req, res, next)=>{
  const idMovie = req.params.id;
  Movie.findByIdAndDelete(idMovie)
    .then(()=>{
      return res.status(200).json(`Movie con ID ${idMovie} borrado correctamente`)
    })
    .catch(error =>{
      return next(error)
    })
})

// PUT para actualizar una movie
router.put('/:id', (req, res,next)=>{
  const id = req.params.id;
  const nuevaMovie = new Movie(req.body)
  nuevaMovie._id=id
  Movie.findByIdAndUpdate(id, nuevaMovie, {new: true})
    .then(movieActualizada => {
      res.status(200).json(movieActualizada)
    
    })
    .catch(error=>{
      next(error)
    })

})

module.exports = router;