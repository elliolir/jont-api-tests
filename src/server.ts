import { app } from '@/app';
import { PORT } from '@/services/config.service';
import { initDataSource } from '@/data-source';

initDataSource();

app.listen(PORT, () => {
  console.info(`Listening at ${PORT}`);
})