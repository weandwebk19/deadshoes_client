const {models} = require('../models')

exports.user = async (customerid) => {
    return models.customers.findOne({
        where: {
            customerid: customerid
        }
    })
}

exports.home = () => {
    return models.products.findAll({raw: true});
};
