'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userFirstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userLastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userPicture: {
        type: Sequelize.STRING
      },
      userEmail: {
        unique: true,
        type:Sequelize.STRING
      },
      userPassword: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('users');
  }
};
