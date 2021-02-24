const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Info}=require('./info.model')
const {Customer}= require('./customer.model');

const UserSchema = new mongoose.Schema({
    ...Info,
    username :{
      type: String,
      required: [true, "username is required"],
      validate: [
        { 
            validator:  val =>(/^[a-zA-Z0-9]+$/.test(val)) ,
            message: "Please enter a valid username" 
        },
        { 
            validator:  async function (val){
                return await User.findOne({username:val})
                .then(res=>{
                    if(res===null)
                        return true;
                    return false;
                })
                .catch(err=>false)
            } ,
            message: "This username is exist" 
        },
    ]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    },
    Role:{
      isAdmin:{
        type:Boolean,
        default:false
      },
      isDealer:{
        type:Boolean,
        default:true
      }
    },
    location:{
      name:{
        type:String
      },
      lat:{
        type:Number,
        required:[true,"region is required"]
      },
      lng:{
        type:Number,
        required:[true,"region is required"]
      },  
    },
    customers:[{
      type:String,
      ref:'Customer',
      validate:{
        validator:async val=>{
          return await Customer.findOne({_id:val})
          .then(res=>res)
          .catch(err=>false)
        },
        message:'customer is not found'
      }
    }]
  }, {timestamps: true});

  UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );
  UserSchema.pre('validate', async function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });
  UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });

  UserSchema.pre('findOne',function(next){
    this.populate('customers');
    next();
  });
  UserSchema.pre('find',function(next){
    this.populate('customers');
    next();
  });
  // UserSchema.pre('update',function(next){
  //   console.log("pre valid");
  //   next();
  // })

  const User =mongoose.model("User",UserSchema);
  module.exports.User =  User;
