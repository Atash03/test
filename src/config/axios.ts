import axios from "axios";
import { Md5 } from "ts-md5";

const date = new Date();

const datePass = {
  year: date.getUTCFullYear(),
  month:
    date.getUTCMonth() < 10
      ? `0${date.getUTCMonth() + 1}`
      : date.getUTCMonth() + 1,
  date: date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate(),
};

const fullDate = `${datePass.year}${datePass.month}${datePass.date}`;

const authPass = Md5.hashStr(`Valantis_${fullDate}`);

const axiosInstance = axios.create({
  baseURL: `http://api.valantis.store:40000`,
  timeout: 10000,
  headers: { "X-Auth": authPass },
});

export { axiosInstance };
