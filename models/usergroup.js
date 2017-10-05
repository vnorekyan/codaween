'use strict';
module.exports = (sequelize, DataTypes) => {
  var userGroup = sequelize.define('userGroup', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });

  return userGroup;
};
