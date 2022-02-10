require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    adminApiKeyToken: process.env.APYKEY_ADMIN_NOMINA,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    expiresIn: process.env.EXPIRES_IN,
}
/*const dbConfig = {
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
};*/
const dbConfig = {
    user: 'qxebueysatodsq',
    host: 'ec2-3-209-38-221.compute-1.amazonaws.com',
    database: 'd47q5ud76r2pij',
    password: 'aa747368baea403054b2d011c7eeb677c64b20b8bd03e701553c3dc0c0154f66',
    port: 5432,
    ssl: true,
    ssl: { rejectUnauthorized: false }
};
const variables = {
    PORT: process.env.PORT || 3000,
}

module.exports = { config, dbConfig,variables };