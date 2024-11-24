const checkRequiredFields = require('../utils/checkRequiredFields');

const validadeRideFields = (req, res, next) => {
  
  const rideRequiredFields = ['customer_id', 'origin', 'destination'];
  
  const {body} = req;
  
  const rideError = checkRequiredFields(body, rideRequiredFields);
  if (rideError) return res.status(400).json({ error_code: "INVALID_DATA", error_description: `Os dados fornecidos no corpo da requisição são inválidos: ${rideError}`})
  
  if(body.origin === body.destination) return res.status(400).json({ error_code: "INVALID_DATA", error_description: 'Os dados fornecidos no corpo da requisição são inválidos: endereços de origem e destino iguais'})

  if(body.origin.trim() ==='' || body.destination.trim() ==='') return res.status(400).json({ error_code: "INVALID_DATA", error_description: 'Os dados fornecidos no corpo da requisição são inválidos: um dos endereços está em branco'})
  next();
};

module.exports = validadeRideFields;