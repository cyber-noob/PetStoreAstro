import { auth } from "./lib/lucia";
import type { MiddlewareResponseHandler } from "astro";

export const onRequest: MiddlewareResponseHandler = async (context, next) => {
	context.locals.auth = auth.handleRequest(context);

	console.log('local auth: ' + JSON.stringify(context.cookies));
	return await next();
};