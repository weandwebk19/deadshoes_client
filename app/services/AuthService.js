const bcrypt = require('bcrypt');
const { models } = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getAccountByUsername = async (username) => {
    const Account = await models.account_customers.findOne({
        where: {
            username: username
        },
        raw: true
    });
    return Account;
}

exports.getAccountById = async (id) => {
    const Account = await models.account_customers.findOne({
        where: {
            accountid: id,
        },
        raw: true
    })
    return Account;
}

exports.getAccountByCustomerId = async (customerid) => {
    const Account = await models.account_customers.findOne({
        where: {
            customerid: customerid,
        },
        raw: true
    })
    return Account;
}

exports.getCustomerById = async (id) => {
    const customer = await models.customers.findOne({
        where: {
            customerid: id,
        },
        raw: true
    })
    return customer;
}

exports.createCustomer = async (customer) => {
    return models.customers.create({name: customer.name, email: customer.email, phone: customer.phone, address: customer.address});
}

exports.createUnauthCustomer = async (customerid) => {
    return models.customers.create({
        customerid: customerid
    });
}

exports.register = async (username, password, customerid) => {
    console.log(username, password, customerid);
    const Account = await models.account_customers.findOne({
        where: {
            username: username,
        },
        raw: true
    })
    if (Account) {
        console.log('Username already exists')
        throw new Error('Username already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    return await models.account_customers.create({ username: username, password: hashPassword, customerid: customerid });
    // .then(() => {
    //     console.log('Successfully created');
    //     return newAcc;
    // })
    // .catch(err => {
    //     console.log(err);
    //     throw new Error(err);
    // });
}

exports.updatePassword = async (accountid, password) => {
    return await models.account_customers.update({ password: password }, { 
        where: { accountid: accountid } 
    });
}