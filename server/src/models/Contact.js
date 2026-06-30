const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Contact = sequelize.define('Contact', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), validate: { isEmail: true } },
  phone: { type: DataTypes.STRING(20) },
  subject: { type: DataTypes.STRING(200) },
  message: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM('new', 'read', 'replied', 'closed'), defaultValue: 'new' },
  type: { type: DataTypes.ENUM('order', 'enquiry'), defaultValue: 'enquiry' },
  admin_notes: { type: DataTypes.TEXT },
  ip_address: { type: DataTypes.STRING(45) },
}, { tableName: 'contacts' });

module.exports = Contact;
