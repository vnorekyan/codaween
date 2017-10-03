'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        user.belongsTo(models.costume, {through: 'user_costume'})
        user.belongsToMany(models.group, {through: 'user_group'})
      }
    }
  });
  return user;
};
