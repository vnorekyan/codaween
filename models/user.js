'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    userFirstName: DataTypes.STRING,
    userLastName: DataTypes.STRING,
    userPicture: DataTypes.STRING,
    userEmail: { type: DataTypes.STRING, unique: true },
    userVotes: DataTypes.INTEGER,
    userPassword: DataTypes.STRING
  }
);

  user.associate = function(models) {
    user.belongsToMany(models.group, {through: 'userGroup'})
    user.belongsToMany(models.costume, {through: 'userCostume'})
  };

  return user;
};
