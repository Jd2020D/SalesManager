const { Fridge } = require('../models/fridge.model');

module.exports.createFridge = (request, response) => {
    Fridge.create(request.body)
        .then(Fridge => response.json(Fridge.populate('type')))
        .catch(err => response.status(400).json(err));
}



module.exports.getAllFridges = (_req, res) => {
    Fridge.find()
        .then(fridges => res.json(fridges))
        .catch(err => res.json(err));
}




module.exports.findSingleFridge = (req, res) => {

    Fridge.findById(req.params.id)
        .then(fridge => res.json(fridge))
        .catch(err => res.json(err));
}


module.exports.deleteFridge = (req, res) => {

    Fridge.findByIdAndDelete(req.params.id)
        .then(() => res.json({success: true}))
        .catch(err => res.json(err));
}

module.exports.updateFridge = (req, res) => {


    Fridge.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then(updated => res.json(updated))
        .catch(err => res.status(400).json(err));
}
