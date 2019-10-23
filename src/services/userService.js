/* eslint-disable no-restricted-globals */

// const url = "https://server-api-caro.herokuapp.com/user/register";
function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log("data----", data);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        location.reload(true);
      }
      console.log("data----not ok", data);
      return Promise.reject(data.returnmessage);
    }

    return data;
  });
}
const register = async user => {
  const requestOptions = {
    method: "POST",
    headers: {Accept: "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(user),
  };
  console.log(requestOptions.body);
  return fetch(
    `https://server-api-caro.herokuapp.com/user/register`,
    requestOptions
  ).then(handleResponse);
};
const login = (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password}),
  };

  return fetch(`https://server-api-caro.herokuapp.com/user/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      console.log(JSON.stringify(user));
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
};
const authHeader = () => {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return {Authorization: `Bearer ${user.token}`};
  }
  return {};
};
function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`https://server-api-caro.herokuapp.com/me`, requestOptions).then(
    handleResponse
  );
}
const userService = {
  register,
  login,
  getAll,
};
export default userService;
