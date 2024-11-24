const { RideServices } = require('../services')
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

module.exports = { estimate };
