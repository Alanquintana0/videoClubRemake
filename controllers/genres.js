const express = require('express');
const {Genres} = require('../db');

function list(req, res, next){
    Genres.findAll()
            .then(objects => res.json(objects))
            .catch(err => res.send(err));
};

function index(req, res, next){
    const id = req.params.id;
    Genres.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(err));
};

function create(req, res, next){
    let description = req.body.description;
    let status = req.body.status;

    let genre = new Object({
        description: description,
        status: status
    });

    Genres.create(genre)
            .then(obj => res.json(obj))
            .catch(err => res.json(err));
};

function replace(req, res, next){
    const id = req.params.id;
    Genres.findByPk(id)
            .then((object) => {
                const description = req.body.description ? req.body.description : object.description;
                const status = req.body.status ? req.body.status : object.status;
                object.update({description: description, status: status})
                        .then(obj => res.json(obj))
                        .catch(err => res.send(err));
            }).catch(err => res.send(err));
};

function update(req, res, next){
    res.send(`respond with an update =${req.params.id}`);  
};

function destroy(req, res, next){
    const id = req.params.id;
    Genres.destroy({ where:{ id:id } })
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
};

module.exports = {list, index, create, update, destroy, replace};
