const dbConfig = require("../../db.config");
const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    port: dbConfig.PORT,
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  timezone: "Asia/Jakarta"
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.brands = require("./brand.model")(sequelize, Sequelize, DataTypes);
db.products = require("./product.model")(sequelize, Sequelize, DataTypes);
db.customers = require("./customer.model")(sequelize, Sequelize, DataTypes);
db.purchases = require("./purchase.model")(sequelize, Sequelize, DataTypes);

// db.brands.hasMany(db.products, { as: "products" });
db.products.belongsTo(db.brands, {
    as: "brands",
});

db.purchases.belongsTo(db.customers, {
    as: "customers",
});
db.purchases.belongsTo(db.products, {
    as: "products",
});
  
  

module.exports = db;
