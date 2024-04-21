import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;

// Create a connection pool
const pool = new Pool({
  user: db_username,
  password: db_password,
  database: db_name,
  host: db_host,
  port: db_port,
});

// Test the connection
pool.query(`SELECT * FROM users`, (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the database at:", res.rows);
  }
  // Note: With Pool, there's no need to manually close the connection
});

// Function to create a user
export function createUser(userData) {
  const { firstName, lastName, email, password, phone } = userData;
  console.log(`Going to add this user: ${firstName}`);

  // Parameterized query
  const query = `
    INSERT INTO users (first_name, last_name, email, password, phone)
    VALUES ($1, $2, $3, $4, $5)
  `;

  // Execute the query with user data as parameters
  pool.query(
    query,
    [firstName, lastName, email, password, phone],
    (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
      } else {
        console.log("User added successfully:", result.rowCount);
      }
    }
  );
}

// Function to authenticate a user
export async function authenticateUser(email, password) {
  const query = `
    SELECT * FROM users
    WHERE email = $1 AND password = $2
  `;
  const result = await pool.query(query, [email, password]);

  return result.rowCount > 0;
}
