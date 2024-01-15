import { DataSource } from 'typeorm';

import { getDBConfig } from "@/services/config.service";

const dataSource = new DataSource(getDBConfig())

export const initDataSource = () => dataSource.initialize().then(() => console.log('Data Source has been initialized!'));

export default dataSource;