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

export async function getUserByEmail(email) {
  const query = `
    SELECT * FROM users
    WHERE email = $1
  `;
  const result = await pool.query(query, [email]);

  console.log("User found:", result.rows[0]);
  return result.rows[0];
}

export async function authenticateUser(email, password) {
  const query = `
    SELECT * FROM users
    WHERE email = $1 AND password = $2
  `;
  const result = await pool.query(query, [email, password]);

  return result.rowCount > 0;
}

export async function addFlightTrack(data) {
  const {
    user_id,
    departure,
    destination,
    maxPrice,
    dateFrom,
    dateTo,
    returnFrom,
    returnTo,
    minNightsInDest,
    maxNightsInDest,
    maxFlyDuration,
    sameCityReturn,
    maxStops,
  } = data;

  const query = `
    INSERT INTO flight_track (
      user_id,
      departure_city,
      destination_city,
      max_price,
      date_from,
      date_to,
      return_from,
      return_to,
      nights_in_dst_from,
      nights_in_dst_to,
      max_fly_duration,
      diff_city_return,
      max_stopovers
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  `;

  const result = await pool.query(query, [
    user_id,
    departure,
    destination,
    maxPrice,
    dateFrom,
    dateTo,
    returnFrom,
    returnTo,
    minNightsInDest,
    maxNightsInDest,
    maxFlyDuration,
    sameCityReturn,
    maxStops,
  ]);

  return result.rowCount > 0;
}

// Function to retrieve all flight trackers will be executed via cron job
export async function getFlightTrackers() {
  const query = `
    SELECT * FROM flight_track
  `;
  const result = await pool.query(query);
  return result.rows;
}

// Work on this, see what is being returned from the API and create a table for the flights found.
export async function insertFlightData(userId, data) {
  const query = `
    INSERT INTO found_flights (user_id, data)
    VALUES ($1, $2)
  `;
  const result = await pool.query(query, [userId, data]);
  return result.rowCount > 0;
}
