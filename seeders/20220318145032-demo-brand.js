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
      await queryInterface.bulkDelete("brands", null, {}, { transaction });
      await queryInterface.bulkInsert(
        "brands",
        [
          {
            intBrandID: uuidv4(),
            txtBrandName: "Susu",
          },
          {
            intBrandID: uuidv4(),
            txtBrandName: "Obat",
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
       await queryInterface.bulkDelete("brands", null, {}, { transaction });
       await transaction.commit();
     } catch (error) {
       await transaction.rollback();
       throw err;
     }
 
  }
};
