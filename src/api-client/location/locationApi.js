import axios from "axios";
let baseUrl = "http://api.opencube.tw";
export const getAllTWCities = async () => {
  // TODO
  const url = baseUrl + `/twzipcode/get-citys`;
  try {
    return await axios.get(url);
  } catch (error) {
    console.warn(error);
  }
};
