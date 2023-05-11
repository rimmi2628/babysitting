'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Complaint.init({
    name: DataTypes.STRING,
    complaint_id: DataTypes.STRING,
    complaint_issue: DataTypes.STRING,
    description: DataTypes.STRING,
    date:DataTypes.STRING,
    user_id:DataTypes.INTEGER,
    account_type:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Complaint',
  });
  return Complaint;
};