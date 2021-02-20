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
    const {id} = req.params;
    Fridge.findById(id)
        .then(fridge => res.json(fridge))
        .catch(err => res.json(err));
}


module.exports.deleteFridge = (req, res) => {
    const {id} = req.params;
    Fridge.findByIdAndDelete(id)
        .then(() => res.json({success: true}))
        .catch(err => res.json(err));
}

module.exports.updateFridge = (req, res) => {
    const {id} = req.params;
    const {serialNumber} = req.body;
    Fridge.findByIdAndUpdate(id, {serialNumber: serialNumber}, {new: true, runValidators: true})
        .then(updated => res.json(updated))
        .catch(err => res.status(400).json(err));
}
