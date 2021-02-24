const jwt = require("jsonwebtoken");
const { User } = require('../models/user.model');
const {populateUserCustomers} = require('../controllers/user.controller')
module.exports.authenticate =  (req, res, next) => {
  jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY,async (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      const user=await  User.findOne({_id:payload.id})
      .then( user=>user)
      .catch(err=>null);
      if (user===null)
        res.status(401).json({verified: false});
      else{
        res.locals.user=user;
        next();
      }
    }
  });
}
module.exports.isAdmin = (req, res, next) => {
  if(!res.locals.user.Role.isAdmin)
   res.status(401).json({verified: false});
   else{
     next();
   }
 }
  