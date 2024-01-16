import { lucia } from "lucia";
import { mysql2 } from "@lucia-auth/adapter-mysql";
import mysql from "mysql2/promise";
import { astro } from "lucia/middleware";
import { facebook, github, google } from "@lucia-auth/oauth/providers";
import fs from "fs";


const connectionPool = mysql.createPool({
	host: 'localhost',
  	user: 'root',
  	database: 'petstore_schema',
	password: 'MoistMiser!@3'
});

//Debug this line as it will crash the server even if table exists or not with a sql error
// connectionPool.execute(fs.readFileSync("schema.sql", "utf8"));

// expect error (see next section)
export const auth = lucia({
	env: "DEV", // "PROD" if deployed to HTTPS,

    adapter: mysql2(connectionPool, {
		user: "user",
		session: "user_session",
		key: "user_key"
	}),

	middleware: astro(),

	getUserAttributes: (data) => {
		return {
			userName: data.username
		};
	}
});

export const githubAuth = github(auth, {
	clientId: import.meta.env.GITHUB_CLIENT_ID,
	clientSecret: import.meta.env.GITHUB_CLIENT_SECRET
});

export const googleAuth = google(auth, {
	clientId: import.meta.env.GOOGLE_CLIENT_ID,
	clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
	redirectUri: "http://localhost:4321/login/google/callback"
});

export const facebookAuth = facebook(auth, {
	clientId: import.meta.env.FB_CLIENT_ID,
	clientSecret: import.meta.env.FB_CLIENT_SECRET,
	redirectUri: "http://localhost:4321/facebook/google/callback"
})

export type Auth = typeof auth;
