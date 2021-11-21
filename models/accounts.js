const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accounts', {
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
    role: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      defaultValue: "USER"
    }
  }, {
    sequelize,
    tableName: 'accounts',
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
