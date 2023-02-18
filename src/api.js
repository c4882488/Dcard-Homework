import axios from "axios";

const headers = {
  Accept: "application/json",
  Authorization: localStorage.getItem("authToken"),
};

const cors = "https://cors-anywhere.herokuapp.com/";

// User API
const userRequest = axios.create({
  baseURL: cors+"https://github.com/login/",
});

// github API
const githubRequest = axios.create({
  baseURL: cors+"https://api.github.com/",
});

export const apiUserLogin = (data) =>
  userRequest.post("oauth/access_token", data);

export const apiGraphql = (data) => githubRequest.post("graphql", data, { headers });

// Issues API
export const apiGetIssues = () => githubRequest.get("issues", { headers });
export const apiGetIssuesByRepo = (owner, repo, data) =>
  githubRequest.get(`/repos/${owner}/${repo}/issues`, data, { headers });
// TODO: 不一定會用到
export const apiGetIssuesByRepoAndNumber = (owner, repo, number) =>
  githubRequest.get(`/repos/${owner}/${repo}/issues/${number}`, { headers });

export const apiCreatIssue = (owner, repo, data) =>
  githubRequest.post(`/repos/${owner}/${repo}/issues`, data, { headers });

export const apiUpdateIssue = (owner, repo, number, data) =>
  githubRequest.patch(`/repos/${owner}/${repo}/issues/${number}`, data, {
    headers,
  });

export const apiDeleteIssue = (owner, repo, number) =>
  githubRequest.patch(
    `/repos/${owner}/${repo}/issues/${number}`,
    { state: "closed" },
    { headers }
  );

