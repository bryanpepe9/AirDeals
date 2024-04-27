import axios from "axios";
import dotenv from "dotenv";
import fetchExcelData from "./readExcel.js";
import { getFlightTrackers, insertFlightData } from "./db.js";
dotenv.config();

const apiKey = process.env.TEQUILA_API_KEY;

async function findFlights(parameters) {
  try {
    const result = await getFlightTrackers();

    for (const row of result) {
      const {
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
        max_stopovers,
      } = row;

      const params = {
        fly_from: departure_city,
        fly_to: destination_city,
        date_from: date_from,
        date_to: date_to,
        return_from: return_from,
        return_to: return_to,
        nights_in_dst_from: nights_in_dst_from,
        nights_in_dst_to: nights_in_dst_to,
        max_fly_duration: max_fly_duration,
        ret_to_diff_city: diff_city_return,
        price_to: max_price,
        max_stopovers: max_stopovers,
        vehicle_type: "aircraft",
        limit: 3,
      };

      // Make the GET request with API key and parameters
      const response = await axios.get(
        "https://api.tequila.kiwi.com/v2/search",
        {
          params: parameters,
          headers: {
            apikey: apiKey,
          },
        }
      );

      // Process the response data
      console.log(response.data);

      insertFlightData(user_id, response.data);
    }
  } catch (error) {
    console.error("There was a problem with the request:", error);
  }
}

// This function should be executed when the script is run cron job
// const excelData = await fetchExcelData();
// const rows = excelData["prices"];

// const departureCity = "MIA";

// for (const row of rows) {
//   const { iataCode, city, lowestPrice } = row;
//   console.log(`${city} (${iataCode}) - ${lowestPrice}`);
//   const params = {
//     fly_from: departureCity,
//     fly_to: iataCode,
//     date_from: "2024-05-01",
//     date_to: "2024-05-07",
//     return_from: "2024-05-10",
//     return_to: "2024-05-15",
//     nights_in_dst_from: 4,
//     nights_in_dst_to: 9,
//     max_fly_duration: 14,
//     ret_to_diff_city: false,
//     price_to: lowestPrice,
//     max_stopovers: 1,
//     vehicle_type: "aircraft",
//     limit: 1,
//   };

//   await findFlights(params);
// }
