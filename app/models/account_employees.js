const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_employees', {
    accountid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "1234"
    },
    employeeid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'employeeid'
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      defaultValue: "employee"
    }
  }, {
    sequelize,
    tableName: 'account_employees',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "account_employees_pkey",
        unique: true,
        fields: [
          { name: "accountid" },
        ]
      },
    ]
  });
};
