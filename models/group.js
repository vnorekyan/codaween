'use strict';
module.exports = (sequelize, DataTypes) => {
  var group = sequelize.define('group', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: DataTypes.STRING
  });

  group.associate = function(models) {
    group.belongsToMany(models.user, {through: 'userGroup'})
  };

  return group;
};
