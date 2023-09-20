import { lucia } from "lucia";
import { mysql2 } from "@lucia-auth/adapter-mysql";
import mysql from "mysql2/promise";
import { astro } from "lucia/middleware";
import { github } from "@lucia-auth/oauth/providers";
import fs from "fs";


const connectionPool = mysql.createPool({
	host: 'localhost',
  	user: 'root',
  	database: 'mydb',
	password: 'MoistMiser!@3'
});

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
			githubUsername: data.username
		};
	}
});

export const githubAuth = github(auth, {
	clientId: import.meta.env.GITHUB_CLIENT_ID,
	clientSecret: import.meta.env.GITHUB_CLIENT_SECRET
});

export type Auth = typeof auth;