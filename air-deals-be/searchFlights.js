import axios from "axios";
import dotenv from "dotenv";
import fetchExcelData from "./readExcel.js";
dotenv.config();

const apiKey = process.env.TEQUILA_API_KEY;

async function findFlights(parameters) {
  try {
    // Make the GET request with API key and parameters
    const response = await axios.get("https://api.tequila.kiwi.com/v2/search", {
      params: parameters,
      headers: {
        apikey: apiKey,
      },
    });

    // Process the response data
    console.log(response.data);
  } catch (error) {
    console.error("There was a problem with the request:", error);
  }
}

const excelData = await fetchExcelData();
const rows = excelData["prices"];

const departureCity = "MIA";

for (const row of rows) {
  const { iataCode, city, lowestPrice } = row;
  console.log(`${city} (${iataCode}) - ${lowestPrice}`);
  const params = {
    fly_from: departureCity,
    fly_to: iataCode,
    date_from: "2024-05-01",
    date_to: "2024-05-07",
    return_from: "2024-05-10",
    return_to: "2024-05-15",
    nights_in_dst_from: 4,
    nights_in_dst_to: 9,
    max_fly_duration: 14,
    ret_to_diff_city: false,
    price_to: lowestPrice,
    max_stopovers: 1,
    vehicle_type: "aircraft",
    limit: 1,
  };

  await findFlights(params);
}
