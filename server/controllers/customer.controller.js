const { Promise } = require('mongoose');
const { Customer } = require('../models/customer.model');
const {Fridge} = require('../models/fridge.model');

const populateFridgesForSingleCustomer=async (customer)=>{
    const {_id:customerId,firstName,lastName,email,phone,location,fridges:PackedFridges} =customer;
    const unPackedFridges = PackedFridges.map(async (fridge)=>{
        const {_id:fridgeId,quantity} =fridge;
        const unPackedFridge = await Fridge.findOne({_id:fridgeId});
        const {serialNumber,type,createdAt,updatedAt}=unPackedFridge;
        return {quantity:quantity,_id:fridgeId,serialNumber,type,createdAt,updatedAt}

    })
    return {_id:customerId,firstName,lastName,email,phone,location,fridges:await Promise.all(unPackedFridges)};

}
const populateFridgesForManyCustomers = (customers)=>{
    return customers.map(async (customer,index)=>{
        return await populateFridgesForSingleCustomer(customer);
    });
}
module.exports.populateFridgesForManyCustomers=populateFridgesForManyCustomers;


module.exports.createCustomerMiddleWare = (request, response,next) => {
    Customer.create(request.body)
        .then(async customer => {response.locals.newCustomerId=customer._id;next();})
        .catch(err => response.status(400).json(err));
}

module.exports.createCustomer = (request, response) => {
    Customer.create(request.body)
        .then(async customer => response.json(await populateFridgesForSingleCustomer(customer)))
        .catch(err => response.status(400).json(err));
}

module.exports.updateCustomer=(req,res)=>{
    Customer.findByIdAndUpdate({_id:req.params.customerId},req.body,{runValidators:true,new:true})
        .then(async updatedUser => res.json(await populateFridgesForSingleCustomer(updatedUser)))
        .catch(err => res.status(400).json(err));
}

module.exports.updateCustomerMiddleWare=(req,res,next)=>{
    Customer.findByIdAndUpdate({_id:req.params.customerId},req.body,{runValidators:true,new:true})
        .then(() =>{ next()})
        .catch(err => res.status(400).json(err));
}

module.exports.addFridgeToCustomerMiddleWare=(req,res,next)=>{
    Customer.findByIdAndUpdate({_id:req.params.customerId}, {
        $addToSet:{
            fridges:{_id:req.params.fridgeId,quantity:req.body.quantity}
        }
    }, { upsert: true, new: true,runValidators: true })
        .then(() =>{ next()})
        .catch(err => res.status(400).json(err));
}


const fridgeIsntFoundMessage= {
    "errors": {
    "fridges": {
        "name": "ValidatorError",
        "message": "fridge is not found",
        "properties": {
            "message": "fridge is not found",
            "type": "user defined",
            "path": "_id",
            "value": "603574621ce721db4107ee0"
        },
        "kind": "user defined",
        "path": "_id",
        "value": "603574621ce721db4107ee0"
        }
    }
};
module.exports.updateCustomerFridgeMiddleWare=(req,res,next)=>{
    Customer.findOneAndUpdate({_id:req.params.customerId ,fridges:{$elemMatch:{_id:req.params.fridgeId}}}, {
        $set:{
            "fridges.$.quantity":req.body.quantity
        }
    }, { upsert: true, new: true,runValidators: true })
        .then(() =>{ next()})
        .catch(err => {
            if(err.codeName==="BadValue")
            err= fridgeIsntFoundMessage;
            res.status(400).json(err)
        });
}
module.exports.deleteCustomerFridgeMiddleWare=(req,res,next)=>{
    Customer.findOneAndUpdate({_id:req.params.customerId ,fridges:{$elemMatch:{_id:req.params.fridgeId}}}, {
        $pull:{
            fridges:{_id:req.params.fridgeId}
        }
    }, { upsert: true, new: true,runValidators: true })
        .then(() =>{ next()})
        .catch(err => {
            if(err.codeName==="BadValue")
            err= fridgeIsntFoundMessage;
            res.status(400).json(err)
        });
}

module.exports.preventDuplicateFridge=(req,res,next)=>{
    Customer.find({_id:req.params.customerId,fridges:{$elemMatch:{_id:req.params.fridgeId}}})
    .then(query=>{
        if(query.length>0)
            throw {
                "errors": {
                    "customers": {
                        "name": "ValidatorError",
                        "message": "customer has this fridge , you could change the quantity ",
                        "properties": {
                            "message": "customer has this fridge , you could change the quantity",
                            "type": "user defined",
                            "path": "fridges",
                            "value": req.params.fridgeId
                        },
                        "kind": "user defined",
                        "path": "fridges",
                        "value": req.params.fridgeId
                    },
                }
            }
        else next();
    })
    .catch(err=>res.status(400).json(err))
}
// module.exports.preventUnExistFridge=(req,res,next)=>{
//     Customer.find({_id:req.params.customerId,fridges:{$elemMatch:{_id:req.params.fridgeId}}})
//     .then(query=>{
//         if(query.length<=0)
//             throw {
//                 "errors": {
//                 "fridges": {
//                     "name": "ValidatorError",
//                     "message": "fridge is not found",
//                     "properties": {
//                         "message": "fridge is not found",
//                         "type": "user defined",
//                         "path": "_id",
//                         "value": "603574621ce721db4107ee0"
//                     },
//                     "kind": "user defined",
//                     "path": "_id",
//                     "value": "603574621ce721db4107ee0"
//                     }
//                 }
//             }
//         else next();
//     })
//     .catch(err=>res.status(400).json(err))
// }


module.exports.deleteCustomer =(req,res) =>{
    Customer.findByIdAndDelete({_id:req.params.customerId})
        .then(()=> res.json({success: true}))
        .catch(err =>res.json(err));
}
module.exports.deleteCustomerMiddleWare =(req,res) =>{
    Customer.findByIdAndDelete({_id:req.params.customerId})
        .then(()=> {
            res.json((res.locals.modifiedUser))
        
        })
        .catch(err =>console.log(err));
}


module.exports.getAllCustomers=(req,res)=>{
    Customer.find()
        .then(async customers =>{
             res.json(await Promise.all(populateFridgesForManyCustomers(customers)))
        })
        .catch(err =>res.json(err));
}
