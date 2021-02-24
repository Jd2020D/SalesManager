const { Fridge } = require('../models/fridge.model');

const populateType = async (fridgId)=>{
    return await Fridge.findById(fridgId);
}
module.exports.populateType=populateType;
module.exports.createFridge = (request, response) => {
    Fridge.create(request.body)
        .then(async fridge =>{
            response.json(await populateType(fridge._id));
        })
        .catch(err => response.json((err)));
}



module.exports.getAllFridges = (req, res) => {
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


    Fridge.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).populate('type')
        .then(updated => res.json(updated))
        .catch(err => res.status(400).json(err));
}
