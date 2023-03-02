import axios from "axios";

const cors = "https://corsany.herokuapp.com/";

// const headers = {
//   "Authorization":localStorage.getItem("authToken"),
//   "Content-Type": "application/json",
// };

// User API
const userRequest = axios.create({
  baseURL: cors+"https://github.com/login/",
});

// github API
const githubRequest = axios.create({
  baseURL: cors+"https://api.github.com/"});

// Oauth authorization
export const apiUserLogin = (data) =>
  userRequest.post("oauth/access_token", data);

// GraphQL Api
export const apiGraphql = (data, headers) =>
  githubRequest.post("graphql", data, { headers });

