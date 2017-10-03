'use strict';
module.exports = (sequelize, DataTypes) => {
  var userGroup = sequelize.define('userGroup', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //     }
  //   }
  });

  return userGroup;
};
