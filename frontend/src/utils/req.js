import axios from "axios";
import { async } from "react-advanced-form";
import { api_baseUrl } from "./urls";
export async function handlePostReq(api, body, headers) {
  let backResponse;
  // let _token = localStorage.getItem("_token");
  let config = {
    headers: {
      Permission: "2021D@T@f@RSt*6&%2-D@T@",
    },
  };
  await axios
    .post(`${api_baseUrl}${api}`, body, config)
    .then(async(response) => {
      backResponse = response;
      console.log(response.data);
      }).catch((err) =>{
        backResponse = {
          data: {
            status: 504,
            message: "Something is wrong internally",
          },
        };
      });
  return backResponse;
}

export async function handleGetReq(api) {
  let backResponse;
  let _token = localStorage.getItem("_token");
  let config = {
    headers: {
      "x-access-token": `Bearer ${_token}`,
      Permission: "2021D@T@f@RSt*6&%2-D@T@",
    },
  };

  await axios
    .get(`${api_baseUrl}${api}`, config)
    .then((response) => {
      backResponse = response;
    })
    .catch((err) => {
      throw err;
    });
  return backResponse;
}
