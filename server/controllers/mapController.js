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

  async create(req, res) {
    try {
      const mapCollection = await Maps.create({
        name: req.body.name,
        club: req.body.club,
        cartographer: req.body.cartographer,
        cartography: req.body.cartography,
        year: req.body.year,
        geometry: req.body.geom,
      });
      res.status(201).send(mapCollection);
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
  }
}


/*const Pool = require('pg').Pool;
const GeoJSON = require('geojson');
const config = require('../config');
const { db: { user, host, database, password, port } } = config;
const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
});

const getGeojson = (request, response, next) => {
  let queryLayer = 'SELECT  st_asGeoJson(geom) as geometry FROM test;';
  pool.query(queryLayer, (err, res) => {
    if (err) {
      return console.error('Error Intern ', err.stack);
    }
    let data = res.rows;
    let geo;
    data.forEach( function (item, index, array){
      geo  = JSON.parse (array[index].geometry);
      array[index].geometry = geo;
    });
    let geojson = GeoJSON.parse(data, {GeoJSON : 'geometry' });
    response.json(geojson);
  });
};
module.exports = { getGeojson };*/
