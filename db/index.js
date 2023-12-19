import { Pool, Client } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ecommerce_app",
    password: "postgres",
    port: "5432"
});

console.log(await pool.query("SELECT NOW()"));

const Client = new Client({
    user: "postgres",
    host: "postgres",
    database: "ecommerce_app",
    password: "postgres",
    port: "5432"
});

await Client.connect();

console.log(await Client.query("SELECT NOW()"));

await Client.end();