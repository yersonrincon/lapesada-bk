require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    adminApiKeyToken: process.env.APYKEY_ADMIN_NOMINA,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    expiresIn: process.env.EXPIRES_IN,
}
/*  const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  //port: parseInt(process.env.DB_PORT, 10),
  parseJSON: true,
  connectionTimeout: 300000,
  requestTimeout: 300000,
  pool: {
      idleTimeoutMillis: 300000,
      max: 100
  }
  
};
const variables = {
  PORT: process.env.PORT || 3000,
} */
const dbConfig = {
    user: 'lapesadadb_7hx5_user',
    host: 'dpg-cl9s2shm6hds73dc1c8g-a.oregon-postgres.render.com',
    database: 'lapesadadb_7hx5',
    password: 'tqW3wsljgGtYnKiMFtagHpJPUGFGSNz6',
    port: 5432,
    ssl: true,
    ssl: { rejectUnauthorized: false }
};
const variables = {
    PORT: process.env.PORT || 3000,
}

module.exports = { config, dbConfig, variables };