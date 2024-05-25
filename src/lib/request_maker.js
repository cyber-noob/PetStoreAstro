import axios from "axios";

export async function get({ uri, headers, query_params }) {
  let result = {
    response: null,
    error: null,
  };

  await axios(uri, {
    method: "GET",
    headers: headers,
    params: query_params,
  })
    .then((response) => (result["response"] = response.data))
    .catch((error) => {
      console.error("Error:", error);
      result["error"] = error;
    });

  return result;
}

export async function post({ uri, headers, body }) {
  let result = {
    response: null,
    error: null,
  };

  await axios(uri, {
    method: "POST",
    headers: headers,
    data: body,
  })
    .then((response) => (result["response"] = response.data))
    .catch((error) => {
      console.error("Error:", error);
      result["error"] = error;
    });

  return result;
}
