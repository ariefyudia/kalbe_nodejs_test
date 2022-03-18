'use strict';
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const transaction = await queryInterface.sequelize.transaction();
     try {
      await queryInterface.bulkDelete("customers", null, {}, { transaction });
      await queryInterface.bulkInsert(
        "customers",
        [
          {
            intCustomerID: uuidv4(),
            txtCustomerName: "Arief Yudia Ramadhani",
            txtCustomerAddress: "Jl. Satria Ujung Menteng No 95 Cakung",
            bitGender: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            intCustomerID: uuidv4(),
            txtCustomerName: "Ummy Zakiyyah",
            txtCustomerAddress: "Jl. Satria Ujung Menteng No 95 Cakung",
            bitGender: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw err;
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     const transaction = await queryInterface.sequelize.transaction();
     try {
       await queryInterface.bulkDelete("customers", null, {}, { transaction });
       await transaction.commit();
     } catch (error) {
       await transaction.rollback();
       throw err;
     }
 
  }
};
