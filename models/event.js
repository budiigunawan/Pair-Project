'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Event extends Model {

  }

  Event.init({
    event_name: DataTypes.STRING,
    event_date: DataTypes.DATE,
    description: DataTypes.STRING(1234)
  },{sequelize});

  Event.associate = function(models) {
    Event.belongsToMany(models.User, {through: models.User_Event})
    Event.hasMany(models.User_Event)
  };
  return Event;
};