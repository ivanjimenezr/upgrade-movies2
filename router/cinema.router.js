const express = require('express');

const router = express.Router();

const Cinema = require('../models/Cinema')


// GET todas los Cinemas
router.get('/', (req, res, next) => {
  return Cinema.find().populate('movies')
  .then(cines => {
      // Si encontramos el cinema, los devolveremos al usuario
      res.status(200).json(cines)
  })
  .catch((err)=>{
      // Si hay un error, enviaremos por ahora una respuesta de error.
      const errorOcurrido = new Error();
      return next(errorOcurrido)
  })
})

// GET cinema por ID
router.get('/:id',(req, res, next)=>{
  const id = req.params.id;
  Cinema.findById(id).populate('movies')
    .then(cines => {
      if (!cines){
        const error = new Error(`Cinema con el ID ${id}, no existe`);
        error.status = 404;
        return next(error)
      }
      res.json(cines)
    })
    .catch((err)=>{
      return next(new Error())
    })

})

// GET cinema por su nombre
router.get('/name/:name', (req, res, next)=>{
  const name = req.params.name;
  Cinema.find({ name: name })
    .then(cines => {
      // Si encontramos el cine, lo devolveremos al usuario
      res.status(200).json(cines)
    })
    .catch((err)=>{
        // Si hay un error, enviaremos por ahora una respuesta de error.
        
        return next(new Error())
    })
})

// GET cines por su localización
router.get('/location/:location', (req, res, next)=>{
  const location = req.params.location;
  Cinema.find({ location: location })
    .then(cines => {
      // Si encontramos la localizacion, los devolveremos al usuario
      res.status(200).json(cines)
    })
    .catch((err)=>{
        // Si hay un error, enviaremos por ahora una respuesta de error.
        console.log(`Error en GET /location/${location}`, err)
        return next(new Error())
    })
})

// POST para crear Cinema 
router.post('/', (req, res, next) => {
  const newCinema = new Cinema({
    name: req.body.name,
    location: req.body.location,
    movies: req.body.movies || [],
  })
  newCinema.save().then(()=>{
    return res.status(201).json(newCinema)
  }).catch((error)=>{
    return next(error);
  })
})

// DELETE para borrar una movie
router.delete('/:id', (req, res, next)=>{
  const idCinema = req.params.id;
  Cinema.findByIdAndDelete(idCinema)
    .then(()=>{
      return res.status(200).json(`Cinema con ID ${idCinema} borrado correctamente`)
    })
    .catch(error =>{
      return next(error)
    })
})

// PUT para actualizar un Cinema
router.put('/:id', (req, res,next)=>{
  const error = new Error('Método no implementado')
  error.status(405)
  next(new Error)
})

//PUT para añadir pelicula a un cine
router.put('/:id/movies', (req, res, next) => {
  const cinemaId = req.params.id;
  const movieId = req.body.movieAAnadir;
  
  Cinema.findByIdAndUpdate(
    cinemaId,
    {$push: {movies: movieId}},
    {new :true})
      .then(cineActualizado => {
        res.status(200).json(cineActualizado)
      })
      .catch(error => {
        next(error);
      });
})

module.exports = router;