const AdminController = require('../controllers/admin.controller');
const { authenticate } = require('../config/jwt.config');
const { isAdmin } = require('../config/jwt.config');


module.exports = function(app) {
    app.get("/api/users/all", authenticate, isAdmin, AdminController.getAllUsers);
    app.post("/api/users/create", authenticate, isAdmin, AdminController.createUser);
    app.delete("/api/users/delete/:id", authenticate, isAdmin, AdminController.deleteUser);
    app.put("/api/user/update/:id", authenticate, isAdmin, AdminController.updateUser);
}