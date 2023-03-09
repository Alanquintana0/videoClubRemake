const express = require('express');
const {Members} = require('../db');

function list(req, res, next){
    Members.findAll()
            .then(objects => res.json(objects))
            .catch(err => res.send(err));
};

function index(req, res, next){
    const id = req.params.id;
    Members.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(err));
};

function create(req, res, next){
    let name = req.body.name;
    let last_name = req.body.last_name;
    let address = req.body.address;
    let phone = req.body.phone;
    let status = req.body.status;

    let member = new Object({
        name: name,
        last_name: last_name,
        address: address,
        phone: phone,
        status: status
    });

    Members.create(member)
            .then(obj => res.json(obj))
            .catch(err => res.json(err));
};

function replace(req, res, next){
    const id = req.params.id;
    Members.findByPk(id)
            .then((object) => {
                const name = req.body.name ? req.body.name : object.name;
                const last_name = req.body.last_name ? req.body.last_name : object.last_name;
                const address = req.body.address ? req.body.address : object.address;
                const phone = req.body.phone ? req.body.phone : object.phone;
                const status = req.body.status ? req.body.status : object.status;
                object.update({name: name, last_name: last_name, address: address,
                phone: phone, status: status})
                        .then(obj => res.json(obj))
                        .catch(err => res.send(err));
            }).catch(err => res.send(err));
};

function update(req, res, next){
    res.send(`respond with an update =${req.params.id}`);  
};

function destroy(req, res, next){
    const id = req.params.id;
    Members.destroy({ where:{ id:id } })
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
};

module.exports = {list,index,create,update,destroy,replace};