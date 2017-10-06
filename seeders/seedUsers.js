'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      userFirstName: 'Marita',
      userLastName: 'Sailor',
      userPicture: 'https://i.pinimg.com/736x/a4/90/47/a49047d73e5644961b123aa48790d5c8--skeleton-jack-jack-skellington-costume.jpg',
      userEmail: 'marita.sailor@capitalone.com',
      userPassword: 'viktorita',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userFirstName: 'Viktoria',
      userLastName: 'Norekyan',
      userPicture: 'https://i.pinimg.com/736x/a4/90/47/a49047d73e5644961b123aa48790d5c8--skeleton-jack-jack-skellington-costume.jpg',
      userEmail: 'viktoria.norekyan@capitalone.com',
      userPassword: 'viktorita',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
  }
};
