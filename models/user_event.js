'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  User_Event.init({
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  },
    {});

  User_Event.associate = function(models) {
    User_Event.belongsTo(models.Event)
    User_Event.belongsTo(models.User)
  };
  return User_Event;
};