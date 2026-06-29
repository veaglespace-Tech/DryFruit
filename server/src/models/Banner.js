const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Banner = sequelize.define('Banner', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  subtitle: { type: DataTypes.STRING(300) },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING(500) },
  cta_text: { type: DataTypes.STRING(100) },
  cta_link: { type: DataTypes.STRING(300) },
  position: { type: DataTypes.ENUM('hero', 'secondary', 'promotional'), defaultValue: 'hero' },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'banners' });

module.exports = Banner;
