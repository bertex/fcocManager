// index.js
const mapsController = require('../controllers/mapController');
const fileController = require('../controllers/filesController')
module.exports = (app) => {

  app.get('/api',(req,res) => {
    res.status(200).send({
      data : "Welcome Node Sequlize API v1"
    })
  });

  app.get('/api/map', mapsController.getMaps);

  app.post('/api/map/create',mapsController.create);

  app.put('/api/map/:mapId',mapsController.update);

  app.post('api/uploadfile/fileId', fileController.uploadFile);

  //app.get('api/getFile/:fileId', fileController.getfile);

};
