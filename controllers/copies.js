const express = require('express');
const Copy = require('../models/copy');
const Movie = require('../models/movie');

function list(req, res, next){
    Copy.find().then(objs => res.status(200).json({
        message: "copies list",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"Error en la consulta",
        obj:ex
    }))
};

function index(req, res, next){
    const id = req.params.id;
    Copy.findOne({"_id":id}).then(obj=>res.status(200).json({
        message: `Copy with id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No info",
        err:ex
    }))
};

async function create(req, res, next){
    let number = req.body.number;
    let format = req.body.format;
    let movieId = req.body.movieId;
    let status = req.body.status;

    let movie = await Movie.findOne({"_id":movieId});

    let copy = new Copy({
        number:number,
        format:format,
        movie:movie,
        status:status
    });
    copy.save().then(obj => res.status(200).json({
        message:"Copy created",
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"Copy not created",
        err:ex
    }))

};

async function replace(req, res, next){
    const id = req.params.id;
    let number = req.body.number ? req.body.number:"";
    let format = req.body.format ? req.body.format:"";
    let movieId = req.body.movieId ? req.body.movieId:"";
    let status = req.body.status ? req.body.status:"";

    if(movieId != ""){
        let movie = await Movie.findOne({"_id":movieId});
    }else{
        movie = movieId;
    }
    let copy = new Object({
        _format:format,
        _number:number,
        _status:status,
        _movie:movie
    })
    

};

function update(req, res, next){
    const id = req.params.id;
    let number = req.body.number ? req.body.number:"";
    let format = req.body.format ? req.body.format:"";
    let movieId = req.body.movieId ? req.body.movieId:"";
    let status = req.body.status ? req.body.status:"";

    let copy = new Object();

    if(number) copy.number = number;
    if(format) copy.format = format;
    if(movieId) copy.movie = movieId;
    if(status) copy.status = status;

    Copy.findOneAndUpdate({"_id": id}, copy)
            .then(obj => res.status(200).json({
                message: `Copia con ${id} actualizada correctamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                message: "No se pudo actualizar la copia",
                err: ex
            }));
};

function destroy(req, res, next){
    const id = req.params.id;

    Copy.findByIdAndRemove({"_id": id})
            .then(obj => res.status(200).json({
                message: `Copia con ${id} eliminada correctamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                message: "No se pudo eliminar la copia",
                err: ex
            }));
};

module.exports = {list,index,create,update,destroy,replace};