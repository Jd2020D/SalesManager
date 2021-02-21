const { Customer } = require('../models/customer.model');
const {Fridge} = require('../models/fridge.model');
const {populateType} = require('./fridge.controller');
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


            // const populateCustomers =  (customers)=>{
            //     const newCustomers=  customers.map(async(customer,index)=>{
            //         const b=await customer.fridges.map((fridge,index)=>{
            //             // const pop = await populateType(fridge._id);
            //             // console.log(pop)
            //             return "d";
            //         })
            //         console.log(b)
            //         customer.fridges=b;
            //          return  {...customer,fridges:Promise.all()};
            //     })
            //     return Promise.all(newCustomers);
            //}

module.exports.getAllCustomers=(req,res)=>{
    Customer.find()
        .then(async customers =>{
            // await populateCustomers(customers);
            // console.log(41);
            // await res.json({"suc":await populateCustomers(customers)})
            await res.json(customers)
        })
        .catch(err =>res.json(err));
}
