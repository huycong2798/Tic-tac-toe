/* eslint-disable no-restricted-globals */

// const url = "https://server-api-caro.herokuapp.com/user/register";
const authHeader = () => {
  // return authorization header with jwt token
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    return {Authorization: `Bearer ${token}`};
  }
  return {};
};
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
      return Promise.reject(data.returnmessage);
    }

    return data;
  });
}
const register = user => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user),
  };
  return fetch(
    `https://server-api-caro.herokuapp.com/user/register`,
    requestOptions
  ).then(handleResponse);
};
const getMe = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`https://server-api-caro.herokuapp.com/me`, requestOptions).then(
    handleResponse
  );
};
const login = (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password}),
  };

  return fetch(`https://server-api-caro.herokuapp.com/user/login`, requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log(JSON.stringify(res));
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("token", JSON.stringify(res.token));
      return res;
    });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
const edit = info => {
  const requestOptions = {
    method: "PUT",
    headers: {...authHeader(), "Content-Type": "application/json"},
    body: JSON.stringify(info),
  };
  console.log("body----", requestOptions.body);
  return fetch(`https://server-api-caro.herokuapp.com/user/edit`, requestOptions).then(
    handleResponse
  );
};
const userService = {
  register,
  login,
  getMe,
  logout,
  edit,
};
export default userService;
