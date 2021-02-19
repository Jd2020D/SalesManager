const CustomerController = require('../controllers/customer.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post("/api/customer", CustomerController.createCustomer);

}