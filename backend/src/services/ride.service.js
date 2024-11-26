const { Driver, Ride } = require('../models');


const axios = require('axios');

const URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  throw new Error('Chave API não definida ou não localizada');
}

const estimate = async (originAddress, destinyAddress) => {
  
  try {
    const body = {
      origin: {
        address: originAddress,
      },
      destination: {
        address: destinyAddress,
      },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_AWARE',
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      languageCode: 'en-US',
      units: 'IMPERIAL',
    };

    const headers = {
      'Content-Type': 'application/json',
      'x-Goog-Api-Key': GOOGLE_API_KEY,
      'X-Goog-FieldMask':'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs.startLocation,routes.legs.endLocation'
    };

    const response = await axios.post(URL, body, { headers });

    if (!response.data || !response.data.routes || response.data.routes.length === 0) {
      throw new Error('Sem dados na response.');
    }

    const route = response.data.routes[0];
    const leg = route.legs[0];

    const origin = {
      latitude: leg.startLocation.latLng.latitude,
      longitude: leg.startLocation.latLng.longitude,
    };

    const destination = {
      latitude: leg.endLocation.latLng.latitude,
      longitude: leg.endLocation.latLng.longitude,
    };

    const distance = route.distanceMeters / 1000;
    const duration = route.duration;

    const drivers = await Driver.findAll();

    
    const filteredDrivers = drivers
      .filter((driver) => driver.kmMin <= distance)
      .map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.rating,
          comment: driver.comment,
        },
        value: parseFloat((distance * driver.value).toFixed(2)), // Custo total arredondado
      }));

    
    const sortedDrivers = filteredDrivers.sort((a, b) => a.value - b.value);

    return {
      status: 'SUCCESSFUL',
      data: {
        origin,
        destination,
        distance,
        duration,
        options: sortedDrivers,
        routeResponse: route,
      },
    };
  } catch (error) {
    console.error('Erro ao chamar a API do Google:', error.message);
    return {
      status: 'FAILED',
      error: error.message,
    };
  }
};



const getAllRides = async () => {
  const rides = await Ride.findAll();
  return{ status: 'SUCCESSFUL', data: rides};
}


const insertRide = async (object) => {
  try {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = object;

    const ride = await Ride.create({
      idCustomer: customer_id, // Corrigido para corresponder ao modelo
      date: new Date(), // Preenche automaticamente a data com o timestamp atual
      origin,
      destination,
      distance,
      duration,
      idDriver: driver.id, // Corrigido para corresponder ao modelo
      value,
    });

    return { status: 'SUCCESSFUL', data: ride };
  } catch (error) {
    console.error('Error inserting ride:', error.message);
    return { status: 'FAILED', error: error.message };
  }
};

module.exports = {
  estimate,
  getAllRides,
  insertRide
};
