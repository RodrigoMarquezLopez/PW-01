import { Sequelize } from "sequelize";

const DB_USER = process.env.DB_USER as string;//"clinica_user" ;//process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;//"6E1trAfCZtqsaaHHkb54D9tLv8ASINbf";
const DB_NAME = process.env.DB_NAME as string;//"clinica";
const DB_HOST = process.env.DB_HOST as string;//"postgres://clinica_user:6E1trAfCZtqsaaHHkb54D9tLv8ASINbf@dpg-cdo6559a6gdooi7rc4k0-a.oregon-postgres.render.com/clinica";//process.env.DB_HOST as string;
const DB_PORT = process.env.DB_PORT as string;
const DB_DIALECT = "postgres";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: DB_DIALECT,
  dialectOptions: {
    encrypt: true,
    ssl:false/*{
      rejectUnauthorized: true,
    }*/
  },
  logging:false
})