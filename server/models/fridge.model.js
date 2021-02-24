const mongoose = require('mongoose');
const {Type}= require('./type.model');

const FridgeSchema = new mongoose.Schema({
    type: {
      type:String,
      ref:'Type',
      validate:{
        validator:async val=>{
          return await Type.findOne({_id:val})
          .then(res=>{
              if(res===null)
                  return false;
              return true;
          })
          .catch(err=>false);
},
        message:'type is not found'
      }
    },
    serialNumber: {
      type: String,
    }


  }, {timestamps: true});
const autoPouplateType=function(next){
  this.populate('type');
  
  next();

}
FridgeSchema.pre('find',autoPouplateType);
FridgeSchema.pre('findOne',autoPouplateType);
module.exports.FridgeSchema=FridgeSchema;
module.exports.Fridge = mongoose.model("Fridge", FridgeSchema);
