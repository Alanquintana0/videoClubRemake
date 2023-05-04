const express = require('express');
const Booking = require('../models/booking');
const Member = require('../models/member');
const Copy = require('../models/copy');

function list(req, res, next){
    Booking.find().then(objs => res.status(200).json({
        message:"Lista de bookings",
        obj: objs
    })).catch(ex => res.status(500).json({
        message:"No se pudo consultar la informacion",
        obj: ex
    }));
};

function index(req, res, next){
    const id = req.params.id;
    Booking.findOne({"_id": id}).then(obj => res.status(200).json({
        message: `Booking con id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message:"No se pudo consultar la informacion",
        obj: ex
    }));
};

async function create(req, res, next){
    const date = req.body.date;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;

    let member = await Member.findOne({"_id": memberId});
    let copy = await Copy.findOne({"_id": copyId});

    let booking = new Booking({
        date: date,
        member: member,
        copy: copy
    });

    booking.save().then(obj => res.status(200).json({
        message: `Reserva creada correctamente`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo almacenar la reserva",
        err: ex
    }));
};

function replace(req, res, next){
    const id = req.params.id;
    let date = req.body.date ? req.body.date : "";
    let memberId = req.body.memberId ? req.body.memberId : "";
    let copyId = req.body.copyId ? req.body.copyId : "";

    let booking = new Object({
        _date: date,
        _memberId: memberId,
        _copyId: copyId
    });

    Booking.findOneAndUpdate({"_id": id}, booking, {new: true})
            .then(obj => res.status(200).json({
                message: "Reserva reemplazada correctamente",
                obj: obj
            })).catch(ex => res.status(500).json({
                message: "No se pudo remplazar la reserva",
                obj: ex
            }));
};

function update(req, res, next){
    const id = req.params.id;
    let date = req.body.date ? req.body.date : "";
    let memberId = req.body.memberId ? req.body.memberId : "";
    let copyId = req.body.copyId ? req.body.copyId : "";

    let booking = new Object();

    if(date) booking._date = date;

    if(memberId) booking._memberId = memberId;

    if(copyId) booking._copyId = copyId;

    Booking.findOneAndUpdate({"_id": id}, booking)
            .then(obj => res.status(200).json({
                message: "Reserva actualizada correctamente",
                obj: obj
            })).catch(res.status(500).json({
                message: "No se pudo actualizar la reserva",
                obj: ex
            }));
};

function destroy(req, res, next){
    const id = req.params.id;

    Booking.findByIdAndRemove({"_id": id})
            .then(res.status(200).json({
                message: "Reserva eliminada correctamente",
                obj: obj
            })).catch(res.status(500).json({
                message: "No se pudo eliminar la reserva",
                obj: ex
            }));
};

module.exports = {list,index,create,update,destroy,replace};