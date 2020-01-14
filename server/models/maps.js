module.exports = (sequelize, DataTypes) => {
  let Maps = sequelize.define('Maps', {
    name: DataTypes.STRING,
    club: DataTypes.STRING,
    cartographer: DataTypes.STRING,
    year: DataTypes.INTEGER,
    cartography: DataTypes.STRING,
    geom: DataTypes.GEOMETRY
  }, {});
  Maps.associate = function(models) {
    // associations can be defined here
  };
  return Maps;
};
