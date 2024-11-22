const { Driver } = require('../models');

const getAll = async () => {
  const drivers = await Driver.findAll();
  return{ status: 'SUCCESSFUL', data: drivers};
}

module.exports = {
  getAll,
}