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
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
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
  //   const res = await axios.post(url,);
  //   if(res.status === 200)
  //   {
  //       console.log("successfully register");
  //   }
  //   axios
  //     .post(url, {
  //       email: "queoloan@gmail.com",
  //       password: "12345",
  //     })
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
};
const userService = {
  register,
};
export default userService;
