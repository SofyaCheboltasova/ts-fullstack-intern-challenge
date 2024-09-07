import { Client } from "pg";

export default async function createDatabase() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Sofya2002",
  });
  const databaseName = "pinterest";

  try {
    await client.connect();
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${databaseName}'`
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE ${databaseName}`);
      console.log(`Database ${databaseName} created`);
    }
  } catch (error) {
    console.error("Error while creating database:", error);
  } finally {
    await client.end();
  }
}

