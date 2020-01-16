'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Maps', [{
        name: 'cat',
        club: 'fcoc',
        cartographer: 'Albert Renom',
        year: '2019',
        cartography: 'Josep Maria Santiago',
        geometry: 'MULTIPOLYGON (((0.714111328125 42.83569550641452, 3.372802734375 42.65820178455667, 3.44970703125 42.35042512243457, 3.3837890625 41.92680320648791, 0.59326171875 40.49709237269567, 0.41748046875 40.58058466412761, 0.274658203125 40.60561205826018, 0.164794921875 40.730608477796636, 0.28564453125 40.90520969727358, 0.230712890625 41.12074559016745, 0.428466796875 41.253032440653186, 0.362548828125 41.376808565702355, 0.384521484375 41.541477666790286, 0.3076171875 41.672911819602085, 0.538330078125 41.84501267270689, 0.63720703125 42.049292638686836, 0.68115234375 42.31793945446847, 0.703125 42.61779143282346, 0.714111328125 42.83569550641452)))',
        createdAt: new Date(),
        updatedAt: new Date(),
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
