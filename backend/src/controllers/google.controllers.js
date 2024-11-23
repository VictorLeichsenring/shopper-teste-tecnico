const { GoogleServices } = require('../services')
const mapStatusHTTP = require('../utils/mapStatusHTTP')

const findRoute = async(req, res) => {
  
  const {customer_id, origin, destination } = req.body;
  
  const {status, data } = await GoogleServices.findRoute(origin, destination)
  return res.status(mapStatusHTTP(status)).json(data);
}

module.exports = {
  findRoute,
}