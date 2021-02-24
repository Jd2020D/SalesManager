const { User } = require('../models/user.model');
const { request, response } = require('express');
const {populateUserCustomers} = require('../controllers/user.controller')
const {populateManyUsersCustomers} = require('../controllers/user.controller')





module.exports.getAllUsers = (req, res) => {
    const query =req.params.type==="dealers"?{Role:{isAdmin:false,isDealer:true}}:req.params.type==="admins"?{Role:{isAdmin:true,isDealer:true}}:{}
    User.find(query)
        .then(async users => {
            res.json(await populateManyUsersCustomers(users))
        })
        .catch(err => console.log(err));
}


module.exports.createUser = (request, response) => {
    User.create(request.body)
        .then(async user => {
            const shallowPopulatedUserCustomers=await User.findOne({_id:user._id});
            response.json(await populateUserCustomers(shallowPopulatedUserCustomers))
        })
        .catch(err => {
            response.status(400).json(err);});
        // response.status(400).json(err)
}


module.exports.deleteUser = (req, res) => {

    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({success: true}))
        .catch(err => res.json(err));
}

module.exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).populate('customers')
        .then(async updated => res.json(await populateUserCustomers(updated)))
        .catch(err => res.status(400).json(err));

}