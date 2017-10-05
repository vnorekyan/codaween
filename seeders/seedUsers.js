'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      userFirstName: 'Marita',
      userLastName: 'Sailor',
      userPicture: 'https://i.pinimg.com/736x/a4/90/47/a49047d73e5644961b123aa48790d5c8--skeleton-jack-jack-skellington-costume.jpg',
      userEmail: 'marita.sailor@capitalone.com',
      userPassword: 'viktorita',
      userVotes: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userFirstName: 'Viktoria',
      userLastName: 'Norekyan',
      userPicture: 'https://i.pinimg.com/736x/a4/90/47/a49047d73e5644961b123aa48790d5c8--skeleton-jack-jack-skellington-costume.jpg',
      userEmail: 'viktoria.norekyan@capitalone.com',
      userPassword: 'viktorita',
      userVotes: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    return queryInterface.bulkInsert('groups', [{
      groupName: 'Random group',
      groupDescription: 'description',
      groupPicture: 'https://i.pinimg.com/736x/a4/90/47/a49047d73e5644961b123aa48790d5c8--skeleton-jack-jack-skellington-costume.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    return queryInterface.bulkInsert('costumes', [{
      costumeName: 'Random costume',
      costumeDescription: 'description',
      costumePicture: 'https://i.pinimg.com/736x/a4/90/47/a49047d73e5644961b123aa48790d5c8--skeleton-jack-jack-skellington-costume.jpg',
      costumeLink: "link",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: function (queryInterface, Sequelize) {
  }
};
