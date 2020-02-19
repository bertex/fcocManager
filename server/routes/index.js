// index.js
const passport = require('passport');
require('../config/passport')(passport);
const mapsController = require('../controllers/mapController');
const userController = require('../controllers/userController');


module.exports = (app) => {

  app.get('/api',(req,res) => {
    res.status(200).send({
      data : "Welcome Node Sequlize API v1"
    })
  });

  app.get('/api/map', mapsController.getMaps);

  app.post('/api/map/create',passport.authenticate('jwt', { session: false}),mapsController.create);

  app.put('/api/map/:mapId',mapsController.update);

  app.post('/api/signup', userController.signUp);

  app.post('/api/signin', userController.signIn);



};
