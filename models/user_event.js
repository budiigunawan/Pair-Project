'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User_Event extends Model{}

  User_Event.init({
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  },{sequelize});

  User_Event.associate = function(models) {
    User_Event.belongsTo(models.Event)
    User_Event.belongsTo(models.User)
  };
  return User_Event;
};