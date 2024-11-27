import axios from "axios";

const HOST = "localhost:8080";
const PROTOCOL = "http";

const fetch = axios.create({
  baseURL: `${PROTOCOL}://${HOST}`,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

const shopperApi = async (method: string, endpoint: string, body = {}, customHeaders = {}, params = {}) => {
  let config = {
    method: method,
    url: endpoint,
    headers: { ...customHeaders },
    data: method.toUpperCase() === 'GET' ? undefined : body, // 
    params: method.toUpperCase() === 'GET' ? body : params, // 
  };

  try {
    const response = await fetch(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export default shopperApi;
