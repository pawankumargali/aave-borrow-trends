import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, '../.env')});

const { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, WEB3_PROVIDER_URL } = process.env;

export { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, WEB3_PROVIDER_URL };