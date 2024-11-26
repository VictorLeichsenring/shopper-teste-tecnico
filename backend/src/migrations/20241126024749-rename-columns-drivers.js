'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.renameColumn('Drivers', 'kmMin', 'km_min'),
      queryInterface.renameColumn('Drivers', 'createdAt', 'created_at'),
      queryInterface.renameColumn('Drivers', 'updatedAt', 'updated_at')
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.renameColumn('Drivers', 'km_min', 'kmMin'),
      queryInterface.renameColumn('Drivers', 'created_at', 'createdAt'),
      queryInterface.renameColumn('Drivers', 'updated_at', 'updatedAt')
    ]);
  }
};
