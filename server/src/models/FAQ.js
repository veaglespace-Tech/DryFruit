const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FAQ = sequelize.define('FAQ', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question: { type: DataTypes.STRING(500), allowNull: false },
  answer: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.STRING(100), defaultValue: 'general' },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'faqs' });

module.exports = FAQ;
