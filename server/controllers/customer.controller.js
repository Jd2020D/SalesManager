const { Customer } = require('../models/customer.model');

module.exports.createCustomer = (request, response) => {
    Customer.create(request.body)
        .then(Customer => response.json(Customer))
        .catch(err => response.status(400).json(err));
}

