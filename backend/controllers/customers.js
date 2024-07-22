const Customer = require("../models/customer");

const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('user', 'name email');
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = { getCustomers };
