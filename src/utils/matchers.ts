import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const doc = fs.readFileSync(path.resolve(__dirname, '../../openapi.yaml'), 'utf8');
const swagger = yaml.parse(doc);


const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
ajv.addSchema(swagger, 'swagger');

const toMatchSchema = (data: unknown, schemaName: string) => {
  const pass = ajv.validate(schemaName, data);
  const { errors } = ajv;

  return {
    pass,
    message: () => {
      const trace = errors?.map((error) => `${error.message}`).join('; ');

      if (!pass) {
        console.log(errors);
      }

      return pass ? "Matched the schema. But it shouldn't" : `Did not match the schema: ${trace}`;
    },
  };
};

const toBeContentType = (response: request.Response, type: string) => {
  const contentType = response.headers['content-type'];
  const pass = response.headers['content-type'].includes(type);

  return {
    pass,
    message: () => {
      return `Expected content type to include ${type}, but received: ${contentType}`;
    },
  };
};

const toHaveStatusCode = (response: request.Response, code: number) => {
  const { status } = response;
  const pass = status === code;

  return {
    pass,
    message: () => `Expected status code to be ${code}, but received: ${status}`,
  };
};

expect.extend({
  toMatchSchema,
  toBeContentType,
  toHaveStatusCode,
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchSchema(schemaName: string): R;
      toBeContentType(type: string): R;
      toHaveStatusCode(code: number): R;
    }
  }
}
