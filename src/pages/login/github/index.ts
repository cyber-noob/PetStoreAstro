import { githubAuth } from "../../../lib/lucia";

import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
	const session = await context.locals.auth.validate();
	if (session) {
		return context.redirect("/", 302); // redirect to profile page
	}
	const [url, state] = await githubAuth.getAuthorizationUrl();
	context.cookies.set("github_oauth_state", state, {
		httpOnly: true,
		secure: !import.meta.env.DEV,
		path: "/",
		maxAge: 60 * 60
	});

	console.log('github index before redirect ...');
	console.log('url -> ' + url);
	console.log('state -> ' + state);
	return context.redirect(url.toString(), 302);
};