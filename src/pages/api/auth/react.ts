import type { APIRoute } from "astro";
import axios from "axios";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  cookies.set("session", idToken, {
    path: "/",
  });

  let info = {};

  await axios({
    url: "/user/profile/connection",
    method: "post",
    baseURL: "http://localhost:8082",
    headers: {
      Authorization: "Bearer " + idToken,
    },
  })
    .then((response) => {
      info = response.data;
      // console.log("success; ", response);
    })
    .catch((error) => {
      console.log("fail: ", error);
    });

  cookies.set("info", info, {
    path: "/",
  });

  return new Response("successfully logged in", { status: 200 });
};
