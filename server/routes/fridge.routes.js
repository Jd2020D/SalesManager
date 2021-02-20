const FridgeController = require('../controllers/fridge.controller');
const { authenticate } = require('../config/jwt.config');
const { isAdmin } = require('../config/jwt.config')
module.exports = function(app){
    app.post("/api/fridge", authenticate,FridgeController.createFridge);
     app.delete("/api/fridge/:id", authenticate,FridgeController.deleteFridge);
    app.put("/api/fridge/:id", authenticate,FridgeController.updateFridge);
    app.get("/api/fridge", authenticate,FridgeController.getAllFridges);
    app.get("/api/fridge/:id", authenticate,FridgeController.findSingleFridge);

}