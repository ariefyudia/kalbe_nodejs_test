module.exports = (sequelize, Sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
    intProductID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    },
    txtProductCode: {
        type: Sequelize.STRING
    },
    txtProductName: {
        type: Sequelize.STRING
    },

    });
  
    return Product;
  };
