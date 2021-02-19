const TypeController = require('../controllers/type.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post("/api/type", TypeController.createType);

}