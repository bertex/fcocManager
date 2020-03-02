// index.js
const passport = require('passport');
require('../config/passport')(passport);
const mapsController = require('../controllers/mapController');
const userController = require('../controllers/userController');


module.exports = (app) => {

  app.get('/api/maps', mapsController.getAllMaps);

  app.get('/api/maps/:userId', mapsController.getMapsByUserId);

  app.get('/api/map/:mapId', mapsController.getMapById);

  app.post('/api/map/create', passport.authenticate('jwt', { session: false}),mapsController.createMap);

  app.put('/api/map/:mapId',passport.authenticate('jwt', { session: false}),mapsController.updateMapById);

  app.delete('/api/map/:mapId', passport.authenticate('jwt', { session: false}),mapsController.deleteMap);

  app.post('/api/signup', userController.signUp);

  app.post('/api/signin', userController.signIn);

};
