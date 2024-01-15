import 'dotenv/config'
import {DataSourceOptions} from "typeorm";

const {PORT = 3000, DB_USER, DB_PASSWORD, DB_HOST = 'localhost', DB_PORT = 8080, DB_NAME} = process.env;

const getDBConfig = (): DataSourceOptions => {
  return {
    type: 'postgres',
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: ['src/entities/*.ts'],
    synchronize: false,
    migrations: ['migrations/**'],
    migrationsRun: true
  };
};

export { PORT, getDBConfig }