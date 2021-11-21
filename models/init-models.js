var DataTypes = require("sequelize").DataTypes;
var _accountsCustomer = require("./accountsCustomer");
var _accountsEmployee = require("./accountsEmployee");
var _customers = require("./customers");
var _employees = require("./employees");
var _orders = require("./orders");
var _products = require("./products");
var _shoessize = require("./shoessize");

function initModels(sequelize) {
  var accountsCustomer = _accountsCustomer(sequelize, DataTypes);
  var accountsEmployee = _accountsEmployee(sequelize, DataTypes);
  var customers = _customers(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var shoessize = _shoessize(sequelize, DataTypes);

  accountsCustomer.belongsTo(customers, { as: "customer", foreignKey: "customerid"});
  customers.hasMany(accountsCustomer, { as: "accountsCustomers", foreignKey: "customerid"});
  orders.belongsTo(customers, { as: "customer", foreignKey: "customerid"});
  customers.hasMany(orders, { as: "orders", foreignKey: "customerid"});
  accountsEmployee.belongsTo(employees, { as: "employee", foreignKey: "employeeid"});
  employees.hasMany(accountsEmployee, { as: "accountsEmployees", foreignKey: "employeeid"});
  orders.belongsTo(products, { as: "product", foreignKey: "productid"});
  products.hasMany(orders, { as: "orders", foreignKey: "productid"});
  shoessize.belongsTo(products, { as: "product", foreignKey: "productid"});
  products.hasMany(shoessize, { as: "shoessizes", foreignKey: "productid"});

  return {
    accountsCustomer,
    accountsEmployee,
    customers,
    employees,
    orders,
    products,
    shoessize,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
