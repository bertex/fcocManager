//mapcontroller.js

const Maps = require('../models').Maps;


module.exports = {
  async getAllMaps(req, res) {
    try {
      const mapsCollection = await Maps.findAll({
        attributes: ['id', 'name', 'club', 'cartographer',
          'cartography', 'year', 'geometry'
        ]
      });
      res.status(201).send(mapsCollection);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },

  async getUserMaps(req, res) {
    try {
      const mapsCollection = await Maps.findAll({
        where: {
          user_id: req.param.userId
        },
        attributes: ['id', 'name', 'club', 'cartographer',
          'cartography', 'year', 'geometry'

        ]
      });
      res.status(201).send(mapsCollection);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  async getMapById(req, res) {
    try {
      const mapsCollection = await Maps.findOne({
        where: {
          user_id: req.param.mapId
        },
        attributes: ['id', 'name', 'club', 'cartographer',
          'cartography', 'year', 'geometry'

        ]
      });
      res.status(201).send(mapsCollection);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },

  async createMap(req, res) {
    try {
      let token = getToken(req.headers);
      console.log(token);
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

  deleteMap(req, res) {

    let token = getToken(req.headers);
    console.log(token);
    if (token) {
      try {
        const mapCollection = Maps.destroy({
          where: {
            id: req.params.mapId
          }
        });
        res.status(201).send(mapCollection);
      } catch (e) {
        console.log(e);
        res.status(400).send(e);
      }
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }

  },


  async updateMapById(req, res) {
    try {
      let token = getToken(req.headers);
      if (token) {
        const mapCollection = await Maps.find({
          id: req.params.mapId
        });
        if (mapCollection) {
          const polygon = req.body.file;
          const updatedMap = await Maps.update({
            name: req.body.name,
            club: req.body.club,
            cartographer: req.body.cartographer,
            cartography: req.body.cartography,
            geometry: polygon,
            year: req.body.year
          });
          res.status(201).send(updatedMap)
        } else {
          res.status(404).send("Map Not Found");
        }
      } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
  ,
  let:
    getToken = function (headers) {
      if (headers && headers.authorization) {
        let parted = headers.authorization.split(' ');
        console.log(parted);
        if (parted.length === 2) {
          return parted[1];
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
}
;

