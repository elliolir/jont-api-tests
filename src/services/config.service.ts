import 'dotenv/config'

const {PORT = 3000, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME} = process.env;

export const CONFIG = {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME
}