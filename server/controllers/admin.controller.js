const { User } = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { request, response } = require('express');

require('dotenv').config();




module.exports.getAllUsers = (_req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
}


module.exports.createUser = (request, response) => {
    User.create(request.body)
        .then(user => response.json(user))
        .catch(err => response.status(400).json(err));
}


module.exports.deleteUser = (req, res) => {

    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({success: true}))
        .catch(err => res.json(err));
}

module.exports.updateUser = (req, res) => {


    User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then(updated => res.json(updated))
        .catch(err => res.status(400).json(err));
}