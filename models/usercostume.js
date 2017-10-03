'use strict';
module.exports = (sequelize, DataTypes) => {
  var userCostume = sequelize.define('userCostume', {
    userId: DataTypes.INTEGER,
    costumeId: DataTypes.INTEGER
  });
  
  return userCostume;
};
