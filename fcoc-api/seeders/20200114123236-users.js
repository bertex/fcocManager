'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      id:'1',
      username:'albert',
      password:'$2a$10$gpSW3QUSOOCnGZzEuz36FeHWMIgDdY8uGxUPyTde1ME8e031O8j8C',
      email:'albert.renom@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
