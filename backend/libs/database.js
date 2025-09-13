import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";  // 👈 add this line here

const { Pool } = pg; 

export const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});
