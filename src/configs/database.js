import pg from "pg";
const { Pool } = pg;

const databaseConfig = {
  user: "postgres",
  host: "localhost",
  database: "always-music",
  password: "secure_pass_here",
  port: 5432,
  ssl: false,
};

export const pool = new Pool(databaseConfig);