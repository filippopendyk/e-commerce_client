import pkg from "pg";
const { Client } = pkg;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce_app',
    password: 'postgres',
    port: '5432'
});

await client.connect();

console.log(await client.query("SELECT * FROM products"));

await client.end();