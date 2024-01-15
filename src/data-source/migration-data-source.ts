// Plain DataSource for migration npm scripts
import {DataSource} from 'typeorm';

import {getDBConfig} from '@/services/config.service';

export default new DataSource(getDBConfig());
