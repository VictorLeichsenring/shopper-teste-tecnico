require('dotenv').config();
const config = {
  username: process.env.MYSQL_USER || 'app_user',
  password: process.env.MYSQL_PASSWORD || 'app_password',
  database: process.env.MYSQL_DATABASE || 'taxi_app',
  host: process.env.MYSQL_HOST || 'db', // "db" é o nome do serviço do banco no docker-compose.yml
  dialect: 'mysql',
  googleApiKey: process.env.GOOGLE_API_KEY || '',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};