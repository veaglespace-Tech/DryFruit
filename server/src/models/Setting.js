const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Setting = sequelize.define('Setting', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  key: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  value: { type: DataTypes.TEXT },
  type: { type: DataTypes.ENUM('text', 'image', 'json', 'boolean'), defaultValue: 'text' },
  group: { type: DataTypes.STRING(50), defaultValue: 'general' },
  label: { type: DataTypes.STRING(150) },
}, { tableName: 'settings' });

module.exports = Setting;
