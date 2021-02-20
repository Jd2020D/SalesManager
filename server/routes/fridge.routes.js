const FridgeController = require('../controllers/fridge.controller');
const { authenticate } = require('../config/jwt.config');
const { isAdmin } = require('../config/jwt.config')
module.exports = function(app){
    app.post("/api/fridge", authenticate,isAdmin,FridgeController.createFridge);
     app.delete("/api/fridge/:id", authenticate,isAdmin,FridgeController.deleteFridge);
    app.put("/api/fridge/:id", authenticate,isAdmin,FridgeController.updateFridge);
    app.get("/api/fridge", authenticate,isAdmin,FridgeController.getAllFridges);
    app.get("/api/fridge/:id", authenticate,isAdmin,FridgeController.findSingleFridge);

}