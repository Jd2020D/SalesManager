const { Type } = require('../models/type.model');

module.exports.createType = (request, response) => {
    Type.create(request.body)
        .then(Type => response.json(Type))
        .catch(err => response.status(400).json(err));
}

