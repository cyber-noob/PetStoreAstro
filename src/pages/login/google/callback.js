import { auth, googleAuth } from "../../../lib/lucia.ts";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { profile } from "../../../stores/profileStore.js";

// import type { APIRoute } from "astro";
import { log } from "console";

export const GET = async (context) => {
	log("In google callback ...\nContext - " + JSON.stringify(context))
	const storedState = context.cookies.get("google_oauth_state").value;
	const state = context.url.searchParams.get("state");
	const code = context.url.searchParams.get("code");
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		});
	}
	try {
		const { getExistingUser, googleUser, createUser } =
			await googleAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			const user = await createUser({
				attributes: {
					username: googleUser.name
				}
			});
			return user;
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		context.locals.auth.setSession(session);
		profile.setKey('pic', googleUser.picture)
		return context.redirect("/login", 302); // redirect to profile page
	} catch (e) {
		log("Error handling callback....\n" + e)
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};