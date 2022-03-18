module.exports = (sequelize, Sequelize, DataTypes) => {
    const Purchase = sequelize.define("purchase", {
        intSalesOrderID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    },

    dtSalesOrder: {
        type: "DATETIME",
        allowNull: true,
    },


    intQty: {
        type: Sequelize.DOUBLE
    },

    });
  
    return Purchase;
  };
