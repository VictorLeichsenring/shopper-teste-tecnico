'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Rides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCustomer: {
        field: 'customer_id',
        allowNull: false,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      origin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destination: {
        allowNull: false,
        type: Sequelize.STRING
      },
      distance: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      duration: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idDriver: {
        field: 'driver_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Drivers',
          key: 'id'
        }
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE(10,2)
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Rides')
  }
};
