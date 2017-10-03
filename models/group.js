'use strict';
module.exports = (sequelize, DataTypes) => {
  var group = sequelize.define('group', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        group.belongsToMany(models.user, {through: 'user_group'})
      }
    }
  });
  return group;
};
