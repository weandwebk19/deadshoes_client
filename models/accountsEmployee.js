const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accountsEmployee', {
    username: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      defaultValue: "1234"
    },
    email: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    employeeid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'employeeid'
      }
    }
  }, {
    sequelize,
    tableName: 'accountsEmployee',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "accountsEmployee_pkey",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
