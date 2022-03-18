module.exports = (sequelize, Sequelize, DataTypes) => {
    const Brand = sequelize.define("brand", {
    intBrandID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    },
    txtBrandName: {
        type: Sequelize.STRING
    },

    });
  
    return Brand;
  };
