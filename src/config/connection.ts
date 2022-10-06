import { join } from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const dbConnection: ConnectionOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [join(__dirname, '../**/*.model{.ts,.js}')],
    migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
    cli: {
        entitiesDir: 'src/models',
        migrationsDir: 'src/migration'
    },
};
