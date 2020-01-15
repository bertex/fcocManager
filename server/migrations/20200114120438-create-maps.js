'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Maps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      club: {
        type: Sequelize.STRING
      },
      cartographer: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      cartography: {
        type: Sequelize.STRING
      },
      geom: {
        type: Sequelize.GEOMETRY
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
    return queryInterface.dropTable('Maps');
  }
};
