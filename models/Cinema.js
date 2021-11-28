const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cinemaSchema = new Schema(
    {
        name:{type:String, required:true},
        location: {type:String, required: true},
        
        //Definimos la propiedad de movies como un Array de IDs
        //de Movie creando un enlace entre las dos colecciones
        movies: [{type: mongoose.Types.ObjectId, ref: 'Movie'}]
    },
{
    timestamps: true
}
);
const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;

