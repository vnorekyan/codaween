'use strict';
module.exports = (sequelize, DataTypes) => {
  var group = sequelize.define('group', {
    groupName: DataTypes.STRING,
    groupDescription: DataTypes.STRING,
    groupPicture: DataTypes.STRING
  });

  group.associate = function(models) {
    group.belongsToMany(models.user, {through: 'userGroup'})
  };

  return group;
};
