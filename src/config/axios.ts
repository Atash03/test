import axios from "axios";
import { Md5 } from "ts-md5";

// Function to generate formatted date string
function getFormattedDate() {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

// Generate full date and auth password
const fullDate = getFormattedDate();
const authPass = Md5.hashStr(`Valantis_${fullDate}`);

const axiosInstance = axios.create({
  baseURL: "https://api.valantis.store:41000",
  timeout: 10000,
  headers: { "X-Auth": authPass },
});

export { axiosInstance };
