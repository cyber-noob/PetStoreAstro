import axios from "axios";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  cookies.delete("session");
  cookies.delete("info");
  return new Response("successfully logged out", { status: 200 });
};
