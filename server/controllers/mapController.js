//mapcontroller.js

const Maps = require('../models').Maps;


module.exports = {
  async getMaps(req,res) {
    try {
      const mapsCollection = await Maps.findAll({
        attributes: ['id', 'name','club','cartographer',
          'cartography','year','geometry'

        ]
      });
      res.status(201).send(mapsCollection);
    }
    catch(e){
      console.log(e);
      res.status(500).send(e);
    }
  },

  async create(req,res) {
    console.log(req.body);
    try {
      let token = getToken(req.headers);
      if (token) {
      const polygon = req.body.file;
      const mapCollection = await Maps.create({
        name: req.body.name,
        club: req.body.club,
        cartographer: req.body.cartographer,
        cartography: req.body.cartography,
        geometry: polygon,
        year: req.body.year
      });
      res.status(201).send(mapCollection);
      } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
      }
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  },

  async update(req, res) {
    try {
      const mapCollection = await Maps.find({
        id: req.params.mapId
      });
      if (mapCollection) {
        const updatedMap = await Maps.update({
          id: req.body.mapId,
        });
        res.status(201).send(updatedMap)
      } else {
        res.status(404).send("Map Not Found");
      }
    } catch (e) {
      console.log(e);

      res.status(500).send(e);

    }
  },
  let: getToken = function (headers) {
    if (headers && headers.authorization) {
      let parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};

