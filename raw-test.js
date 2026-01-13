const { Pool } = require("@neondatabase/serverless");
require("dotenv").config();

async function test() {
    const connectionString = process.env.DATABASE_URL;
    console.log("Testing connection to:", connectionString?.substring(0, 30));

    const pool = new Pool({ connectionString });

    try {
        const client = await pool.connect();
        console.log("SUCCESS: Connected to database");
        const res = await client.query("SELECT NOW()");
        console.log("QUERY RESULT:", res.rows[0]);
        client.release();
    } catch (err) {
        console.error("FAILURE: Could not connect to database");
        console.error(err);
    } finally {
        await pool.end();
    }
}

test();
