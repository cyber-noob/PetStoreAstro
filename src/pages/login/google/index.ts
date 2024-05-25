import { googleAuth } from "../../../lib/lucia";

import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
	const session = await context.locals.auth.validate();
	if (session) {
		return context.redirect("/", 302); // redirect to profile page
	}

	const [url, state] = await googleAuth.getAuthorizationUrl();
	context.cookies.set("google_oauth_state", state, {
		httpOnly: true,
		secure: !import.meta.env.DEV,
		path: "/",
		maxAge: 60 * 60
	});

	console.log('google index before redirect ...');
	console.log('url -> ' + url);
	console.log('state -> ' + state);
	return context.redirect(url.toString(), 302);
};