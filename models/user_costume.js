'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_costume = sequelize.define('user_costume', {
    user_id: DataTypes.INTEGER,
    costume_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_costume;
};