import {DataSource, DataSourceOptions} from 'typeorm';

class MainDataSource {
  private dataSource: DataSource;

  get instance() {
    return this.dataSource;
  }

  destroy() {
    return this.dataSource.destroy();
  }

  async initDataSource(params: DataSourceOptions) {
    if (this.dataSource) {
      console.warn('Data Source has been initialized');
      return;
    }

    this.dataSource = new DataSource(params);

    await this.dataSource
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization:', err);
      });
  }
}

export const mainDataSource = new MainDataSource();
