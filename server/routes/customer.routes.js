const CustomerController = require('../controllers/customer.controller');
const { authenticate } = require('../config/jwt.config');
const {isAdmin}=require('../config/jwt.config');
module.exports = function(app){
    app.post("/api/customers", authenticate,isAdmin,CustomerController.createCustomer);
    app.delete("/api/customers/delete/:id", authenticate,isAdmin,CustomerController.deleteCustomer);
    app.put("/api/customers/:id",authenticate,isAdmin,CustomerController.updateCustomer);
    app.get("/api/customers",authenticate,isAdmin,CustomerController.getAllCustomers);
}