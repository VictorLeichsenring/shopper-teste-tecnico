const axios = require('axios');

const URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  throw new Error('Chave API não definida ou não localizada');
}

const findRoute = async (originAddress, destinyAddress) => {
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
      // 'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs.startLocation,routes.legs.endLocation',
      'X-Goog-FieldMask':'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs.startLocation,routes.legs.endLocation'
      // 'X-Goog-FieldMask':'routes.distanceMeters,routes.duration,routes.legs.startLocation.latLng,routes.legs.endLocation.latLng,routes.polyline.encodedPolyline'
    };

    const response = await axios.post(URL, body, { headers });

    if (!response.data || !response.data.routes || response.data.routes.length === 0) {
      throw new Error('Sem dados na response.');
    }

    const route = response.data.routes[0];

    const leg = route.legs[0];

    const distance = route.distanceMeters / 1000; 
    const duration = route.duration;

    const origin = {
      latitude: leg.startLocation.latLng.latitude,
      longitude: leg.startLocation.latLng.longitude,
    };
    const destination = {
      latitude: leg.endLocation.latLng.latitude,
      longitude: leg.endLocation.latLng.longitude,
    };

    return {
      status: 'SUCCESSFUL',
      data: {
        origin,
        destination,
        distance,
        duration,
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

module.exports = { findRoute };
