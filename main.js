const express = require('express');
require('./utils/db')
const PORT = 3000;
const server = express();
const moviesRouter = require('./router/movies.router')
const cinemaRouter = require('./router/cinema.router')
const Movie = require('./models/Movie');
const router = express.Router();

//Middlewareas parseadores para entender los json de los bodies
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//Middleware de enrutado para /movies
server.use('/movies', moviesRouter)
//Middleware de enrutado para /cinema
server.use('/cines', cinemaRouter)

//Middleware de enrutado para rutas no existentes
server.use('*', (req, res, next)=>{
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

// Manejador/Middkeware de errores, siempre se define con los 4 parametros
server.use((err, req, res, next) => {
    console.log('[ERROR] Ha ocurrido un error', err.status, err.message)
	return res.status(err.status || 500).json(err.message || 'Se ha producido un error en el servidor');
});

server.listen(PORT, ()=>{
    console.log(`The server running in http://localhost/${PORT}`)
})