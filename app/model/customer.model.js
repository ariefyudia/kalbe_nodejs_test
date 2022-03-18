module.exports = (sequelize, Sequelize, DataTypes) => {
    const Customer = sequelize.define("customer", {
        intCustomerID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    },
    txtCustomerName: {
        type: Sequelize.STRING
    },

    txtCustomerAddress: {
        type: Sequelize.STRING
    },

    bitGender: {
        type: Sequelize.BOOLEAN
    },

    });
  
    return Customer;
  };
