import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const bearerToken = process.env.SHEETY_BEARER_TOKEN;
console.log(bearerToken);

async function fetchExcelData() {
  try {
    // Make the GET request with API key and parameters
    const response = await axios.get(
      "https://api.sheety.co/1087b4c8e0100e687a2b07834f662ced/bestFlightDeals/prices",
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    // Process the response data
    return response.data;
  } catch (error) {
    console.error("There was a problem with the request:", error.message);
  }
}

export default fetchExcelData;
