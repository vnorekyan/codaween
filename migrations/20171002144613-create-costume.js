'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('costumes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      costumeName: {
        type: Sequelize.STRING
      },
      costumeDescription: {
        type: Sequelize.STRING
      },
      costumePicture: {
        type: Sequelize.STRING
      },
      costumeLink: {
        type: Sequelize.STRING
      },
      costumeVotes: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('costumes');
  }
};
