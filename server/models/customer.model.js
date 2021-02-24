const mongoose = require('mongoose');
const {Info}=require('./info.model')
const {Fridge}= require('./fridge.model');

const CustomerSchema = new mongoose.Schema({
  ...Info,
  location: {
    lat:{
      type:Number,
      required:[true,"location is required"]
    },
    lng:{
      type:Number,
      required:[true,"location is required"]
    },
  },
  fridges:[
    {
      _id:{
        type:String,
        ref:'Fridge',
        required:[true,'fridge _id is required'],
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
