import axios from "axios";

// const TOKEN = process.env.REACT_APP_API_KEY;
const TOKEN = "cdp8iqaad3ifj5m9iv4gcdp8iqaad3ifj5m9iv50";
export default axios.create({
  baseURL: "https://finnhub.io/api/v1/",
  params: {
    token: TOKEN,
  },
});
