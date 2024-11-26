'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Rides', [
      {
        customer_id: 1,
        date: '2024-11-21 14:30:00', 
        origin: '136 desembargador westphalem, Ponta Grossa, PR',
        destination: '28 cabo marcos antonio de freitas, Ponta Grossa, PR',
        distance: 4500, 
        duration: '15m', 
        driver_id: 2,
        value: 25.50,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        customer_id: 1,
        date: '2024-11-21 16:00:00',
        origin: 'Rua XV de Novembro, Curitiba, PR',
        destination: 'Av. Batel, Curitiba, PR',
        distance: 3800, // Distância em metros
        duration: '12m',
        driver_id: 1,
        value: 18.75,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        customer_id: 1,
        date: '2024-11-21 18:45:00',
        origin: 'Praça Rui Barbosa, Curitiba, PR',
        destination: 'Shopping Estação, Curitiba, PR',
        distance: 1200, // Distância em metros
        duration: '5m',
        driver_id: 3,
        value: 10.00,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rides', null, {});
  },
};
