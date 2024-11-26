const { RideServices, DriverServices } = require('../services')
const mapStatusHTTP = require('../utils/mapStatusHTTP')

const estimate = async (req, res) => {
  const {customer_id, origin, destination } = req.body;

  
  try {
    const result = await RideServices.estimate(origin, destination);

    if (result.status === 'FAILED') {
      return res.status(mapStatusHTTP('FAILED')).json({ error: result.error });
    }

    return res.status(mapStatusHTTP('SUCCESSFUL')).json(result.data);
  } catch (error) {
    console.error('Error in estimateRoute controller:', error.message);
    return res.status(mapStatusHTTP('INTERNAL_SERVER_ERROR')).json({
      error: 'An unexpected error occurred.',
    });
  }
}

const getAllRides = async (req, res) => {
  const {status, data} = await RideServices.getAllRides();
  return res.status(mapStatusHTTP(status)).json(data)
}

const confirmRide = async (req, res) => {
  const { driver, distance } = req.body;

  const driverCheck = await DriverServices.getById(driver.id);
  if (driverCheck.status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP('NOT_FOUND')).json({
      error_code: "DRIVER_NOT_FOUND",
      error_description: driverCheck.error,
    });
  }

  if (distance < driverCheck.data.kmMin) {
    return res.status(406).json({
      error_code: "INVALID_DISTANCE",
      error_description: `A distância mínima para o motorista selecionado é ${driverCheck.data.kmMin} km.`,
    });
  }

  const { status, data } = await RideServices.insertRide(req.body);

  return res.status(mapStatusHTTP(status)).json({ success: true });
  
};


module.exports = { estimate, getAllRides, confirmRide };
