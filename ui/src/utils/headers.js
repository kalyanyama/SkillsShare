export const ServerCallHeaders = (type, body) => {
  const token = localStorage.getItem("token");
  const result = {
    method: type ? type : "GET",
    headers: {
      "Content-type": "application/json",
      "0987654321": token ? token : "",
    },
  };
  if (body) {
    result.body = JSON.stringify(body);
  }
  return result;
};
