const FridgeController = require('../controllers/fridge.controller');
const { authenticate } = require('../config/jwt.config');
const { isAdmin } = require('../config/jwt.config')
module.exports = function(app){
    app.post("/api/fridge", authenticate,isAdmin,FridgeController.createFridge);

}