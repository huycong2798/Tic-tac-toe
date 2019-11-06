const url = "http://localhost:8000/gameonline/findroom";
// const url1 = "https://server-api-caro.herokuapp.com/gameonline/findroom";
function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log("data----", data);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
      }
      return Promise.reject(data.returnmessage);
    }

    return data;
  });
}
const findRoom = () => {
  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions).then(handleResponse);
};
const gameOnlineService = {
  findRoom,
};
export default gameOnlineService;
