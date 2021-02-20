const { Customer } = require('../models/customer.model');

module.exports.createCustomer = (request, response) => {
    Customer.create(request.body)
        .then(Customer => response.json(Customer))
        .catch(err => response.status(400).json(err));
}

module.exports.updateCustomer=(req,res)=>{
    Customer.findByIdAndUpdate({_id:req.params.id},req.body,{runValidators:true})
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err));
}

module.exports.deleteCustomer =(req,res) =>{
    Customer.findByIdAndDelete({_id:req.params.id})
        .then(()=> res.json({success: true}))
        .catch(err =>res.json(err));
}
module.exports.getAllCustomers=(req,res)=>{
    Customer.find()
        .then(customers =>res.json(customers))
        .catch(err =>res.json(err));
}
