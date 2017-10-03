'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    userName: DataTypes.STRING,
    userPicture: DataTypes.STRING,
    userEmail: DataTypes.STRING
  });

  user.associate = function(models) {
    user.belongsToMany(models.group, {through: 'userGroup'})
    user.belongsToMany(models.costume, {through: 'userCostume'})
  };

  return user;
};
