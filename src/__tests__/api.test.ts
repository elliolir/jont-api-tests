import {PostgreSqlContainer, StartedPostgreSqlContainer} from '@testcontainers/postgresql';
import request from 'supertest';
import fs from "fs";

import '@/utils/matchers';

import {app} from '@/app';
import {mainDataSource} from "@/data-source";
import {getDBConfig} from "@/services/config.service";

let container: StartedPostgreSqlContainer;

const schemas = {
  error: 'swagger#/components/schemas/Error',
  todos: 'swagger#/components/schemas/Todos',
  todo: 'swagger#/components/schemas/Todo',
};

const GET_TODO_ID = 1;
const PATCH_TODO_ID = 2;
const NOT_FOUND_TODO_ID = 999;


describe('api tests', () => {
  beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:14').start();

    await mainDataSource.initDataSource(getDBConfig({
      username: container.getUsername(),
      password: container.getPassword(),
      host: container.getHost(),
      dbname: container.getDatabase(),
      port: container.getPort(),
    }));

    const seedQuery = fs.readFileSync(__dirname + '/seed.sql', 'utf-8');

    await mainDataSource.instance.query(seedQuery);
  })

  afterAll(async () => {
    await mainDataSource.destroy();
    await container.stop();
  });

  describe('/todos', () => {
    it('GET - 200', async () => {
      const response = await request(app).get('/todos');

      expect(response).toHaveStatusCode(200);
      expect(response.body).toMatchSchema(schemas.todos);
    });

    it('POST - 200', async () => {
      const value = 'POST todo';

      const response = await request(app).post('/todos').send({value});

      expect(response).toHaveStatusCode(201);
      expect(response.body).toMatchSchema(schemas.todo);

      expect(response.body.value).toEqual(value);
    });
  });

  describe('/todos/:id', () => {
    it('GET - 200', async () => {
      const response = await request(app).get(`/todos/${GET_TODO_ID}`);

      expect(response).toHaveStatusCode(200);
      expect(response.body).toMatchSchema(schemas.todo);
    });

    it('GET - 404', async () => {
      const response = await request(app).get(`/todos/${NOT_FOUND_TODO_ID}`);

      expect(response).toHaveStatusCode(404);
      expect(response.body).toMatchSchema(schemas.error);
    });

    it('PATCH - 200', async () => {
      const value = 'PATCH Updated todo';

      const response = await request(app).patch(`/todos/${PATCH_TODO_ID}`).send({value});

      expect(response).toHaveStatusCode(200);
      expect(response.body).toMatchSchema(schemas.todo);

      expect(response.body.value).toEqual(value);
    });

    it('PATCH - 404', async () => {
      const response = await request(app).patch(`/todos/${NOT_FOUND_TODO_ID}`).send({value: "shouldn't update"});

      expect(response).toHaveStatusCode(404);
      expect(response.body).toMatchSchema(schemas.error);
    });
  });
})