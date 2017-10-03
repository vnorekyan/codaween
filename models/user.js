'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    email: DataTypes.STRING
  });

  user.associate = function(models) {
    user.belongsToMany(models.group, {through: 'userGroup'})
  };

  return user;
};
