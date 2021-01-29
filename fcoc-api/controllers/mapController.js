//mapcontroller.js

const Maps = require('../models').Maps;


module.exports = {
  async getAllMaps(req, res) {
    try {
      const mapsCollection = await Maps.findAll({
        where: req.query,
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

  async getMapsByUserId(req, res) {
    try {
      const mapsCollection = await Maps.findAll({
        where: {
          user_id: req.params.userId
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
          id: req.params.mapId
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
    console.log("body:");
    str=JSON.stringify(req.body);
    console.log(str);
    console.log("tedashkuen");
    let token = getToken(req.headers);
    if (token) {
      //try {
        const polygon = req.body.file;
        const mapCollection = await Maps.create({
          name: req.body.name,
          club: req.body.club,
          cartographer: req.body.cartographer,
          cartography: req.body.cartography,
          geometry: polygon,
          year: req.body.year,
          user_id: req.body.user_id
        });
        res.status(201).send(mapCollection);
      //} catch (e) {
      //  console.log(e);
      //7  res.status(400).send(e);
     // }
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  },

  deleteMap(req, res) {

    let token = getToken(req.headers);
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

    let token = getToken(req.headers);
    if (token) {
      try {
        const polygon = req.body.file;
        const updatedMap = await Maps.update({
          name: req.body.name,
          club: req.body.club,
          cartographer: req.body.cartographer,
          cartography: req.body.cartography,
          geometry: polygon,
          year: req.body.year,
        }, {where: {id: req.params.mapId}});
        res.status(201).send(updatedMap)
      } catch (e) {
        console.log(e);
        res.status(500).send(e);
      }
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }

  }
  ,
  let: getToken = function (headers) {
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
};

