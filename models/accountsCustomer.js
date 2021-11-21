const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accountsCustomer', {
    username: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      defaultValue: "1234"
    },
    email: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    customerid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'customerid'
      }
    }
  }, {
    sequelize,
    tableName: 'accountsCustomer',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "accounts_pkey",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
