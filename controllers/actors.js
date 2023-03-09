const express = require('express');
const {Actors} = require('../db');

function list(req, res, next){
    Actors.findAll()
            .then(objects => res.json(objects))
            .catch(err => res.send(err));
};

function index(req, res, next){
    const id = req.params.id;
    Actors.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(err));
};

function create(req, res, next){
    let name = req.body.name;
    let last_name = req.body.last_name;

    let actor = new Object({
        name: name,
        last_name: last_name
    });

    Actors.create(actor)
            .then(obj => res.json(obj))
            .catch(err => res.json(err));
};

function replace(req, res, next){
    const id = req.params.id;

    Actors.findByPk(id)
            .then((obj) => {
                const name = req.body.name ? req.body.name : "";
                const last_name= req.body.last_name ? req.body.name : "";

                object.update({name: name, last_name: last_name})
                        .then(obj => res.json(obj))
                        .catch(err => res.send(err));
            }).catch(err => res.send(err));
};

function update(req, res, next){
    const id = req.params.id;

    Actors.findByPk(id)
            .then((obj) => {
                const name = req.body.name ? req.body.name : object.name;
                const last_name= req.body.last_name ? req.body.name : object.name;

                object.update({name: name, last_name: last_name})
                        .then(obj => res.json(obj))
                        .catch(err => res.send(err));
            }).catch(err => res.send(err));
};


function destroy(req, res, next){
    const id = req.params.id;
    Actors.destroy({ where:{ id:id } })
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
};


module.exports = {list,index,create,update,destroy,replace};