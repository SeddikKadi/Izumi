import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const base=JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser


let TOKEN = null;
if(base===null){
  TOKEN="";
}else{
  TOKEN=base.accessToken;
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});