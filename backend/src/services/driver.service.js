const { Driver } = require('../models');

const getAll = async () => {
  const drivers = await Driver.findAll();
  return{ status: 'SUCCESSFUL', data: drivers};
}

const getById = async (id) => {
  const driver = await Driver.findByPk(id);
  if (!driver) {
    return { status: 'NOT_FOUND', error: `Motorista com ID ${id} não encontrado.` };
  }

  return { status: 'SUCCESSFUL', data: driver };
}
module.exports = {
  getAll,
  getById
}