import {app} from '@/app';
import {PORT, getDBConfig} from '@/services/config.service';
import {mainDataSource} from '@/data-source';

mainDataSource.initDataSource(getDBConfig());

app.listen(PORT, () => {
  console.info(`Listening at ${PORT}`);
})