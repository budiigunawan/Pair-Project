'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    event_name: DataTypes.STRING,
    event_date: DataTypes.DATE,
    description: DataTypes.STRING(1234)
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};