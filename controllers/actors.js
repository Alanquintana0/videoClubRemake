const express = require('express');
const Actor = require('../models/actor');

function list(req, res, next){
    Actor.find().then(objs => {
        logger.level("info");
        logger.info(res.__("Actor.list"));
        res.status(200).json({
        message:res.__("Actor.list"),
        obj:objs
    })}).catch(ex => {
        logger.level("error");
        logger.error(res.__('Actor.noinfo'));
        res.status(500).json({
        message:res.__("Actor.noinfo"),
        obj:ex
    })});
};

function index(req, res, next){
    const id = req.params.id;
    Actor.findOne({"_id":id}).then(obj=>res.status(200).json({
        message:`Actor con id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
            message:"No se pudo consultar la información",
            obj:ex
        }));
};

function create(req, res, next){
    let name = req.body.name;
    let lastName = req.body.lastName;
    
    let director = new Actor({
        name:name,
        lastName:lastName
    });

    director.save().then(obj => res.status(200).json({
        message:"Actor creado correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se pudo almacenar el actor",
        obj:ex
    }));
};

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let actor = new Object({
        _name : name,
        _lastName : lastName
    });

    Director.findOneAndUpdate({"_id":id},actor,{new : true})
            .then(obj => {res.status(200).json({
                message: "Actor actualizado correctamente",
                obj:obj
            })}).catch(ex => res.status(500).json({
                message:"No se pudo remplazar el director",
                obj:ex
            }));
};

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let actor = new Object();

    if(name){
        actor._name = name;
    }
    if(lastName){
        actor._lastName = lastName;
    }

    Actor.findOneAndUpdate({"_id":id},actor)
            .then(obj => res.status(200).json({
                message:"Actor actuaizado correctamente",
                obj:obj
            })).catch(ex => res.status(500).json({
                message:"No se pudo remplazar el actor",
                obj:ex
            }));
};

function destroy(req, res, next){
    const id = req.params.id;
    Actor.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message: "Actor eliminado correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se pudo eliminar el actor",
        obj:ex
    }));
};

module.exports = {list,index,create,update,destroy,replace};