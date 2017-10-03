'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      userName: 'Marita Sailor',
      userPicture: 'https://i.pinimg.com/736x/a4/90/47/a49047d73e5644961b123aa48790d5c8--skeleton-jack-jack-skellington-costume.jpg',
      userEmail: 'marita.sailor@capitalone.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userName: 'Viktoria Norekyan',
      userPicture: 'https://i.pinimg.com/736x/a4/90/47/a49047d73e5644961b123aa48790d5c8--skeleton-jack-jack-skellington-costume.jpg',
      userEmail: 'viktoria.norekyan@capitalone.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
  }
};
