import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  password: "0312",
  host: "localhost",
  port: 5432,
  database: "pern_todo"
});

export default pool;
