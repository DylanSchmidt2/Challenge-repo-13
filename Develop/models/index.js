// import 4 models getting imported to defines their association
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// by default the foreignKey for the product to category relation will be generated 
// from the target model name (category) and key name (id)
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});
// Products belongToMany Tags (through ProductTag)
// creating many-to-many relation between products, tag, and productTag
// it require productTag to be a junction/join table
// the productTag holds two foreign key coloumns for product_id and tag_id

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey:'product_id',
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id' 
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
