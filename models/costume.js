'use strict';
module.exports = (sequelize, DataTypes) => {
  var costume = sequelize.define('costume', {
    costumeName: DataTypes.STRING,
    costumeDescription: DataTypes.STRING,
    costumePicture: DataTypes.STRING,
    costumeLink: DataTypes.STRING,
    costumeVotes: DataTypes.INTEGER
  });

  costume.associate = function(models) {
    costume.belongsToMany(models.user, {through: 'userCostume'})
  };

  return costume;
};
