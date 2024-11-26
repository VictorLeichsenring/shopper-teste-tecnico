const checkRequiredFields = require('../utils/checkRequiredFields');
const {Driver, Ride} = require('../models');

const validadeRideFields = (req, res, next) => {
  
  const rideRequiredFields = ['customer_id', 'origin', 'destination'];
  
  const {body} = req;
  
  const rideError = checkRequiredFields(body, rideRequiredFields);
  if (rideError) return res.status(400).json({ error_code: "INVALID_DATA", error_description: `Os dados fornecidos no corpo da requisição são inválidos: ${rideError}`})
  
  if(body.origin === body.destination) return res.status(400).json({ error_code: "INVALID_DATA", error_description: 'Os dados fornecidos no corpo da requisição são inválidos: endereços de origem e destino iguais'})

  if(body.origin.trim() ==='' || body.destination.trim() ==='') return res.status(400).json({ error_code: "INVALID_DATA", error_description: 'Os dados fornecidos no corpo da requisição são inválidos: um dos endereços está em branco'})
  next();
};

const validadeRideConfirm = (req, res, next) => {
  const {body} = req;
  const rideRequiredFields = ['customer_id', 'origin', 'destination', 'distance', 'duration', 'driver', 'value' ];
  const rideError = checkRequiredFields(body, rideRequiredFields);
  if (rideError) return res.status(400).json({ error_code: "INVALID_DATA", error_description: `Os dados fornecidos no corpo da requisição são inválidos: ${rideError}`});
  next();
}

const validadeRideByCustomerId = async (req, res, next) => {
  const { customer_id, driver_id } = req.params;
  
  
  if (!customer_id|| customer_id.trim() === '') {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Os dados fornecidos na URL da requisição são inválidos: customer_id não foi informado.',
    });
  }

  if (driver_id) {
    const driver = await Driver.findByPk(driver_id);
    if (!driver) {
      return res.status(404).json({
        error_code: "INVALID_DRIVER",
        error_description: 'Motorista inválido.',
      });
    }
  }

  const rides = await Ride.findAll({
    where: {customer_id},
  });
  if (!rides || rides.length === 0) {
    return res.status(404).json({
      error_code: 'NO_RIDES_FOUND',
      error_description: `Nenhuma corrida encontrada para o customer_id: ${customer_id}.`,
    });
  }
  next();
}

module.exports = {validadeRideFields, validadeRideConfirm, validadeRideByCustomerId};