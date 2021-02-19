const mongoose = require('mongoose');
const {Info}=require('./info.model')
const {Fridge}= require('./fridge.model');

const CustomerSchema = new mongoose.Schema({
  ...Info,
  location: {
    type: String,
    required:[true,"location is required"]
  },
  fridges:[
    {
      fridgeId:{
        type:String,
        ref:'Fridge',
        validate:{
          validator:async val=>{
            return await Fridge.findOne({_id:val})
            .then(res=>res)
            .catch(err=>false)
          },
          message:'fridge is not found'
        }    
      },
      quantity:{
        type:Number,
        default:1
      }
}]
}, {timestamps: true});

module.exports.CustomerSchema=CustomerSchema;
module.exports.Customer = mongoose.model("Customer", CustomerSchema);
