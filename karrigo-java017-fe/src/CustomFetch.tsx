import axios, { AxiosError } from "axios";


function customFetch (token: any){

  return axios.create({
    baseURL: "http://localhost:8085/api/v1",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
}

export default customFetch;
