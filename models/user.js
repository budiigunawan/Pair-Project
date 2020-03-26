'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {}

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  },{sequelize});

  User.associate = function(models) {
    User.belongsToMany(models.Event, {through: models.User_Event})
    User.hasMany(models.User_Event)
  };
  return User;
};