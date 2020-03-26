'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Event extends Model {
    formatAMPM() {
      var hours = this.event_date.getHours()
      var minutes = this.event_date.getMinutes()
      var ampm = hours >= 12 ? 'pm' : 'am';
  
      hours = hours % 12
      hours = hours ? hours : 12
      minutes = minutes < 10 ? '0' +minutes : minutes
  
      var strTime = hours + ':' + minutes + ' ' +ampm
      return strTime
    }
  }

  Event.init({
    event_name: DataTypes.STRING,
    event_date: DataTypes.DATE,
    description: DataTypes.STRING(1234)
  },{sequelize,
    hooks: {
      beforeCreate:(model,option)=>{
        let name = model.event_name
        name = name.charAt(0).toUpperCase() + name.slice(1)
        model.event_name = name
      }
    }
});

  Event.associate = function(models) {
    Event.belongsToMany(models.User, {through: models.User_Event})
    Event.hasMany(models.User_Event)
  };
  return Event;
};