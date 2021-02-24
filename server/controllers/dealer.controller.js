const { User } = require('../models/user.model');
const { Customer } = require('../models/customer.model');
const {populateUserCustomers} = require('../controllers/user.controller');
const CustomerController = require('../controllers/customer.controller');

const { request, response, query } = require('express');
const { compareSync } = require('bcrypt');

const preventDuplicateMessage =(customerId)=>{   
    return {"errors": {
                "customers": {
                    "name": "ValidatorError",
                    "message": "dealer has customer with id "+customerId,
                    "properties": {
                        "message": "dealer has customer with id "+customerId,
                        "type": "user defined",
                        "path": "customers",
                        "value": customerId
                    },
                    "kind": "user defined",
                    "path": "customers",
                    "value": customerId
                },
            }
    }
};

const customerIsntFoundMessage=(customerId)=>{
    return {
        "errors": {
            "customers": {
                "name": "ValidatorError",
                "message": "customer is not found",
                "properties": {
                    "message": "customer is not found",
                    "type": "user defined",
                    "path": "customers",
                    "value": customerId
                },
                "kind": "user defined",
                "path": "customers",
                "value": customerId
            }
        }
    }
}

const dealerIsntFoundMessage=(dealerId)=>{
    return {
        "errors": {
            "dealer": {
                "name": "ValidatorError",
                "message": "dealer is not found",
                "properties": {
                    "message": "dealer is not found",
                    "type": "user defined",
                    "path": "dealer",
                    "value": dealerId
                },
                "kind": "user defined",
                "path": "dealer",
                "value": dealerId
            }
        }
    }
}


//customers pushing
const pushCustomerToDealer = async (userId,newCustomer)=>{
    return await  User.findOneAndUpdate({ _id: userId }, {
        $addToSet:{
            customers:newCustomer
        }
    }, { upsert: true, new: true,runValidators: true }).populate('customers');

}
module.exports.addNewCustomerToCurrentDealer=(request, response) => {
    pushCustomerToDealer(response.locals.user.id,response.locals.newCustomerId)
    .then(async updatedUser => {return response.json(await populateUserCustomers(updatedUser));})
    .catch(err => response.status(400).json(err));

}
module.exports.addNewCustomerToDealerById =(request, response) => {
    pushCustomerToDealer(request.params.dealerId,response.locals.newCustomerId)
    .then(async updatedUser => {return response.json(await populateUserCustomers(updatedUser));})
    .catch(err => response.status(400).json(err));
}

const searchByDealerIdAndCustomerId=async (dealerId,customerId)=>{
        return await User.find({_id:dealerId,customers:{$in:[customerId]}});
}
module.exports.preventDuplicateCustomer =(request,response,next)=>{
    searchByDealerIdAndCustomerId(request.params.dealerId,request.params.customerId)
    .then(result=>{
        if(result.length>=1)
            return response.status(400).json(preventDuplicateMessage(request.params.customerId))
        else{
            next();
        }
    }).catch(err=>response.status(400).json(err))
}
module.exports.addExistCustomerToDealerByIds =(request, response) => {
    pushCustomerToDealer(request.params.dealerId,request.params.customerId)
    .then(async updatedUser => {return response.json(await populateUserCustomers(updatedUser));})
    .catch(err => response.status(400).json(err));
}


///===========================================

//customers pulling

module.exports.test=async(request,response)=>{
    try{
        response.json( await User.find({_id:response.locals.user.id,customers:{$in:[request.params.customerId]}}));

    }
    catch(e){
        console.log(e);
        response.json(e);
    }
}
const pullCustomerFromDealer = async (dealerId,customerId)=>{
    try{
        return await  User.findOneAndUpdate({ _id: dealerId ,customers:{$in:[customerId]}}, {
        $pull:{
            customers:customerId
        }
    }, { upsert: true, new: true,runValidators: true }).populate('customers');
    }catch(e){
        console.log(e);
        if(e.codeName==="BadValue")
            throw customerIsntFoundMessage(customerId);
        if(e.path==='_id' && e.kind==='ObjectId')
            throw dealerIsntFoundMessage(dealerId);
        throw(e);
    }

}


module.exports.removeCustomerFromCurrentDealer=(request, response,next) => {
    pullCustomerFromDealer(response.locals.user.id,request.params.customerId)
    .then(async updatedUser => { 
        response.locals.modifiedUser=await populateUserCustomers(updatedUser);
        next();})
    .catch(err => response.status(400).json(err));

}
module.exports.removeCustomerFromDealerByIds =(request, response,next) => {
    pullCustomerFromDealer(request.params.dealerId,request.params.customerId)
    .then(async updatedUser => {response.locals.modifiedUser=await populateUserCustomers(updatedUser);next();})
    .catch(err =>response.status(400).json(err));
}


////////////////////


//customer update

module.exports.preventUnExistCustomerInDealer=(request, response,next) => {
    const dealerId=request.params.dealerId?request.params.dealerId:response.locals.user.id;
    response.locals.dealerId=dealerId;
    searchByDealerIdAndCustomerId(dealerId,request.params.customerId)
    .then(query=>{
        if (query.length<1)
            throw customerIsntFoundMessage(request.params.customerId)
        else next();
    })
    .catch(e=>{
        if(e.path==='_id' && e.kind==='ObjectId')
            e=dealerIsntFoundMessage(dealerId);
        response.status(400).json(e)})
}



////////////////
module.exports.getDealer=(request, response) => {
    User.findOne({_id:request.params.dealerId?request.params.dealerId:response.locals.user.id})
        .then(async dealer => response.json(await populateUserCustomers(dealer)))
        .catch(err => response.status(400).json(err));
}




// /api/dealers/addFridge/:customerId/:fridgeId {fridge, quantity}

// /api/dealers/:dealerId/addFridge/:customerId/:fridgeId

