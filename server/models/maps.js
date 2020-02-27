module.exports = (sequelize, DataTypes) => {
  let Maps = sequelize.define('Maps', {
    name: DataTypes.STRING,
    club: DataTypes.STRING,
    cartographer: DataTypes.STRING,
    year: DataTypes.INTEGER,
    cartography: DataTypes.STRING,
    geometry: DataTypes.GEOMETRY,
    user_id: DataTypes.INTEGER
  }, {});
  Maps.associate = function(models) {
    // associations can be defined here
    Maps.belongsTo(models.User, {})
  };
  return Maps;
};
