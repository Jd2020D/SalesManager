const { Fridge } = require('../models/fridge.model');

module.exports.createFridge = (request, response) => {
    Fridge.create(request.body)
        .then(Fridge => response.json(Fridge.populate('type')))
        .catch(err => response.status(400).json(err));
}

