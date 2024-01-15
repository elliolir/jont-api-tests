import { app } from '@/app';
import { CONFIG } from '@/services/config.service';

app.listen(CONFIG.PORT, () => {
  console.info(`Listening at ${CONFIG.PORT}`);
})