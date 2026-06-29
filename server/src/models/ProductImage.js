const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Product = require('./Product');

const ProductImage = sequelize.define('ProductImage', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  product_id: { type: DataTypes.INTEGER, references: { model: Product, key: 'id' } },
  image_url: { type: DataTypes.STRING(500), allowNull: false },
  alt_text: { type: DataTypes.STRING(200) },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_primary: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'product_images' });

Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductImage;
