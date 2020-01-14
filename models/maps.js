'use strict';
module.exports = (sequelize, DataTypes) => {
  const Maps = sequelize.define('Maps', {
    name: DataTypes.STRING,
    club: DataTypes.STRING,
    chartographer: DataTypes.STRING,
    year: DataTypes.INTEGER,
    chartography: DataTypes.STRING,
    geom: DataTypes.GEOMETRY
  }, {});
  Maps.associate = function(models) {
    // associations can be defined here
  };
  return Maps;
};