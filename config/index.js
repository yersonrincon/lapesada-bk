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
    user: 'eeomlysybxiukm',
    host: 'ec2-34-192-83-52.compute-1.amazonaws.com',
    database: 'dcpgsgbaprtnop',
    password: 'fea8bcdc5b8d9dbb98770e04c1e87c44aba48ac0e2cecaa338685f074afa836a',
    port: 5432,
    ssl: true,
    ssl: { rejectUnauthorized: false }
};
const variables = {
    PORT: process.env.PORT || 3000,
}

module.exports = { config, dbConfig,variables };