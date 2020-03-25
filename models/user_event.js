'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Event = sequelize.define('User_Event', {
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  }, {});
  User_Event.associate = function(models) {
    // associations can be defined here
  };
  return User_Event;
};