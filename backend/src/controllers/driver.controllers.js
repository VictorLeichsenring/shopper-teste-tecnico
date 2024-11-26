const {DriverServices} = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP')

const getAll = async (req, res) => {
  const { status, data } = await DriverServices.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
}

module.exports = {
  getAll,
}