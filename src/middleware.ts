import { auth } from "./lib/lucia";
import type { MiddlewareResponseHandler } from "astro";

export const onRequest: MiddlewareResponseHandler = async (context, next) => {
	console.log('local auth: ' + JSON.stringify(context));
	context.locals.auth = auth.handleRequest(context);
	return await next();
};