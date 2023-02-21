import axios from "axios";

const headers = {
  Accept: "application/json",
  Authorization: localStorage.getItem("authToken"),
};

// const cors = "https://cors-anywhere.herokuapp.com/";
const cors = "http://localhost:8080/";

// User API
const userRequest = axios.create({
  baseURL: cors+"https://github.com/login/",
});

// github API
const githubRequest = axios.create({
  baseURL: cors+"https://api.github.com/",
});

// Oauth authorization
export const apiUserLogin = (data) =>
  userRequest.post("oauth/access_token", data);

// GraphQL Api
export const apiGraphql = async (data) =>
  await githubRequest.post("graphql", data, { headers });

