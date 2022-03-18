'use strict';
const db = require("../app/model");
const { v4: uuidv4 } = require("uuid");
const Brand = db.brands;

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

     const brandsSusu = await Brand.findOne({
      where: { txtBrandName: "Susu" },
     });

     const brandsObat = await Brand.findOne({
      where: { txtBrandName: "Obat" },
     });
    const transaction = await queryInterface.sequelize.transaction();
     try {
      await queryInterface.bulkDelete("products", null, {}, { transaction });
      await queryInterface.bulkInsert(
        "products",
        [
          {
            intProductID: uuidv4(),
            txtProductCode: 'CP001',
            brandsIntBrandID: brandsSusu.intBrandID,
            txtProductName: 'Milna'
          },
          {
            intProductID: uuidv4(),
            txtProductCode: 'CP002',
            brandsIntBrandID: brandsSusu.intBrandID,
            txtProductName: 'Entrasol'
          },
          {
            intProductID: uuidv4(),
            txtProductCode: 'CP003',
            brandsIntBrandID: brandsObat.intBrandID,
            txtProductName: 'Obat'
          },
        ],
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
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
       await queryInterface.bulkDelete("products", null, {}, { transaction });
       await transaction.commit();
     } catch (error) {
       await transaction.rollback();
       throw err;
     }
  }
};
