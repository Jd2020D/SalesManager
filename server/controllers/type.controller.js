const { Type } = require('../models/type.model');

module.exports.createType = (request, response) => {
    Type.create(request.body)
        .then(Type => response.json(Type))
        .catch(err => response.status(400).json(err));
}



module.exports.getAllTypes = (_req, res) => {
    Type.find()
        .then(types => res.json(types))
        .catch(err => res.json(err));
}




module.exports.findSingleType = (req, res) => {

    Type.findById(req.params.id)
        .then(type => res.json(type))
        .catch(err => res.json(err));
}


module.exports.deleteType = (req, res) => {
    Type.findByIdAndDelete(req.params.id)
        .then(() => res.json({success: true}))
        .catch(err => res.json(err));
}

module.exports.updateType = (req, res) => {
    Type.findByIdAndUpdate(req.params.id,req.body, {new: true, runValidators: true})
        .then(updated => res.json(updated))
        .catch(err => res.status(400).json(err));
}


