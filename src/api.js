import axios from "axios";

const headers = {
  Accept: "application/json",
  Authorization: localStorage.getItem("authToken"),
};
// https://cors-anywhere.herokuapp.com/
// , { headers }
// User API
const userRequest = axios.create({
  baseURL: "https://github.com/login/",
});

// Graphql API
const githubRequest = axios.create({
  baseURL: "https://api.github.com",
});

export const apiUserLogin = (data) =>
  userRequest.post("oauth/access_token", data);

export const apiGraphql = (data) => githubRequest.post("graphql", data, { headers });