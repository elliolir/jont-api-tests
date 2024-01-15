import 'dotenv/config'
import {DataSourceOptions} from "typeorm";

const {PORT = 3000, DB_USER, DB_PASSWORD, DB_HOST = 'localhost', DB_PORT = 8080, DB_NAME} = process.env;

export interface DBParams {
  host: string;
  port: number;
  username: string;
  password: string;
  dbname: string;
  logging?: boolean;
}

const getDBConfig = (params?: DBParams): DataSourceOptions => {
  const { host, port, username, password, dbname } = params ?? {};

  return {
    type: 'postgres',
    host: host ?? DB_HOST,
    port: port ?? +DB_PORT,
    username: username ?? DB_USER,
    password: password ?? DB_PASSWORD,
    database: dbname ?? DB_NAME,
    entities: ['src/entities/*.ts'],
    synchronize: false,
    migrations: ['migrations/**'],
    migrationsRun: true
  };
};

export { PORT, getDBConfig }