const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category_id: { type: DataTypes.INTEGER, references: { model: Category, key: 'id' } },
  name: { type: DataTypes.STRING(200), allowNull: false },
  slug: { type: DataTypes.STRING(220), allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  short_description: { type: DataTypes.STRING(500) },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  original_price: { type: DataTypes.DECIMAL(10, 2) },
  discount_percent: { type: DataTypes.INTEGER, defaultValue: 0 },
  weight: { type: DataTypes.STRING(50) },
  sku: { type: DataTypes.STRING(100), unique: true },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  rating: { type: DataTypes.DECIMAL(2, 1), defaultValue: 5.0 },
  review_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  thumbnail: { type: DataTypes.STRING(500) },
  benefits: { type: DataTypes.JSON },
  nutrition_facts: { type: DataTypes.JSON },
  storage_instructions: { type: DataTypes.TEXT },
  is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_best_seller: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  meta_title: { type: DataTypes.STRING(200) },
  meta_description: { type: DataTypes.TEXT },
}, { tableName: 'products' });

Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

module.exports = Product;
