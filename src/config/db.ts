import { ConnectionOptions } from 'typeorm';

export const dbOptions: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'geoposition',
    database: process.env.DB_NAME || 'converterdb',
    entities: [
    ],
    logging: Boolean(process.env.DB_LOGGING),
    synchronize: false
};