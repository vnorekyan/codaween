'use strict';
module.exports = (sequelize, DataTypes) => {
  var costume = sequelize.define('costume', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        costume.belongsToMany(models.user, {through: 'user_costume'})
      }
    }
  });
  return costume;
};
