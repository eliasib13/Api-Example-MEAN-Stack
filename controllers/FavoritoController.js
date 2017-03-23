'use strict';

let Favorito = require('../models/FavoritoModel');

function prueba(req, res) {
    let nombre = req.params.nombre || 'NO NAME';
    res.status(200).send({
        data: [2,3,4],
        message: 'Hola mundo con NodeJS y Express',
        nombre: nombre
    });
}

function getFavorito(req, res){
    let favoritoId = req.params.id;

    Favorito.findById(favoritoId, (err, favorito) => {
        if(err) {
            res.status(500).send({message: 'Error al devolver el favorito'});
        }
        else {
            if (!favorito) {
                res.status(404).send({message: 'No se ha encontrado el favorito'});
            }
            else {
                res.status(200).send({favorito});
            }
        }
    });
}

function getFavoritos(req, res){
    Favorito.find({}).sort('-_id').exec((err, favoritos) => {
        if (err) {
            res.status(500).send({message: 'Error al devolver los favoritos'});
        }
        else {
            if (!favoritos) {
                res.status(404).send({message: 'No se han encontrado favoritos'});
            }
            else {
                res.status(200).send({favoritos});
            }
        }
    });
}

function saveFavorito(req, res){
    let favorito = new Favorito();

    let params = req.body;
    favorito.title = params.title;
    favorito.description = params.description;
    favorito.url = params.url;

    favorito.save((err, favoritoStored) => {
        if(err) {
            res.status(500).send({message: 'Error al guardar el favorito'});
        }
        else {
            res.status(200).send({favorito: favoritoStored});
        }
    });
}

function updateFavorito(req, res){
    let favoritoId = req.params.id;
    let update = req.body;

    Favorito.findByIdAndUpdate(favoritoId, update, (err, favoritoUpdated) => {
        if(err) {
            res.status(500).send({message: 'Error al actualizar el favorito'});
        }
        else {
            res.status(200).send({favorito: favoritoUpdated});
        }
    });
}

function deleteFavorito(req, res){
    let favoritoId = req.params.id;

    Favorito.findByIdAndRemove(favoritoId, (err, favoritoRemoved) => {
        if(err) {
            res.status(500).send({message: 'Error al eliminar el favorito'});
        }
        else {
            if (!favoritoRemoved) {
                res.status(404).send({message: 'No se ha encontrado el favorito'});
            }
            else {
                res.status(200).send({message: 'Se ha eliminado el favorito'});
            }
        }
    });
}

module.exports = {
    prueba,
    getFavorito,
    getFavoritos,
    saveFavorito,
    updateFavorito,
    deleteFavorito
};