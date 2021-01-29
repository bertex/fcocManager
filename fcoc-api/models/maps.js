module.exports = (sequelize, DataTypes) => {
  let Maps = sequelize.define('Maps', {
    name: DataTypes.STRING,
    club: DataTypes.STRING,
    cartographer: DataTypes.STRING,
    year: DataTypes.INTEGER,
    cartography: DataTypes.STRING,
    geometry: DataTypes.GEOMETRY,
  }, {});
  Maps.associate = function(models) {
    // associations can be defined here
    Maps.belongsTo(models.User, {foreignKey:'user_id'})
  };
  return Maps;
};
