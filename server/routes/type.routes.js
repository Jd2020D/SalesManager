const TypeController = require('../controllers/type.controller');
const { authenticate } = require('../config/jwt.config');
const { isAdmin } = require('../config/jwt.config')

module.exports = function(app){
    app.post("/api/type", authenticate,isAdmin,TypeController.createType);
    app.delete("/api/type/:id", authenticate,isAdmin,TypeController.deleteType);
    app.put("/api/type/:id", authenticate,isAdmin,TypeController.updateType);
    app.get("/api/type", authenticate,isAdmin,TypeController.getAllTypes);
    app.get("/api/type/:id", authenticate,isAdmin,TypeController.findSingleType);


}