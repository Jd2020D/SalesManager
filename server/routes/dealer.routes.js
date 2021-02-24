const DealerConroller = require('../controllers/dealer.controller');
const CustomerController = require('../controllers/customer.controller');
const { authenticate } = require('../config/jwt.config');
const { isAdmin } = require('../config/jwt.config');


module.exports = function(app) {
    app.post("/api/dealers/addCustomer",
    authenticate,
    CustomerController.createCustomerMiddleWare, 
    DealerConroller.addNewCustomerToCurrentDealer
    );
    app.post("/api/dealers/:dealerId/addCustomer", 
    authenticate,
    isAdmin,
    CustomerController.createCustomerMiddleWare,
    DealerConroller.addNewCustomerToDealerById
    );
    app.post("/api/dealers/:dealerId/addCustomer/:customerId",
    authenticate,
    isAdmin,
    DealerConroller.preventDuplicateCustomer,
    DealerConroller.addExistCustomerToDealerByIds
    ); 
    app.delete("/api/dealers/deleteCustomer/:customerId",
    authenticate,
    DealerConroller.removeCustomerFromCurrentDealer,
    CustomerController.deleteCustomerMiddleWare
    );
    app.delete("/api/dealers/:dealerId/deleteCustomer/:customerId", 
    authenticate,isAdmin,  
    DealerConroller.removeCustomerFromDealerByIds,
    CustomerController.deleteCustomerMiddleWare
    ); 
    
    app.put("/api/dealers/updateCustomer/:customerId", 
    authenticate,
    DealerConroller.preventUnExistCustomerInDealer,
    CustomerController.updateCustomerMiddleWare,
    DealerConroller.getDealer
    
    );
    
    app.put("/api/dealers/:dealerId/updateCustomer/:customerId", 
    authenticate,
    isAdmin,
    DealerConroller.preventUnExistCustomerInDealer,
    CustomerController.updateCustomerMiddleWare,
    DealerConroller.getDealer);

    app.post("/api/dealers/addFridge/:customerId/:fridgeId",
    authenticate,
    DealerConroller.preventUnExistCustomerInDealer,
    CustomerController.preventDuplicateFridge,
    CustomerController.addFridgeToCustomerMiddleWare,
    DealerConroller.getDealer);

    app.post("/api/dealers/:dealerId/addFridge/:customerId/:fridgeId",
    authenticate,
    isAdmin,
    DealerConroller.preventUnExistCustomerInDealer,
    CustomerController.preventDuplicateFridge,
    CustomerController.addFridgeToCustomerMiddleWare,
    DealerConroller.getDealer);

    app.put("/api/dealers/updateFridge/:customerId/:fridgeId",
    authenticate,
    DealerConroller.preventUnExistCustomerInDealer,
    CustomerController.updateCustomerFridgeMiddleWare,
    DealerConroller.getDealer);

    app.put("/api/dealers/:dealerId/updateFridge/:customerId/:fridgeId",
    authenticate,
    isAdmin,
    DealerConroller.preventUnExistCustomerInDealer,
    CustomerController.updateCustomerFridgeMiddleWare,
    DealerConroller.getDealer);

    app.delete("/api/dealers/deleteFridge/:customerId/:fridgeId",
    authenticate,
    DealerConroller.preventUnExistCustomerInDealer,
    CustomerController.deleteCustomerFridgeMiddleWare,
    DealerConroller.getDealer);

    app.delete("/api/dealers/:dealerId/deleteFridge/:customerId/:fridgeId",
    authenticate,
    isAdmin,
    DealerConroller.preventUnExistCustomerInDealer,
    CustomerController.deleteCustomerFridgeMiddleWare,
    DealerConroller.getDealer);

}




