const jwt = require("jsonwebtoken");
const { User } = require('../models/user.model');

module.exports.authenticate =  (req, res, next) => {
  jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY,async (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      user=await User.findOne({_id:payload.id}).populate('customers')
      .then(user=>user)
      .catch(err=>null);
      if (user===null)
        res.status(401).json({verified: false});
      else{
        req.user=user;
        next();
      }
    }
  });
}
module.exports.authorizeAdmin = (req, res, next) => {
  if(!req.user.isAdmin)
   res.status(401).json({verified: false});
   else{
     next();
   }
 }
  