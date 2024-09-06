import "reflect-metadata";
import { DataSource } from "typeorm";
import AppDataSource from "./src/data-source";
import ServerClass from "./src/server";

async function app() {
  const server = new ServerClass();
  server.start();

  const database: DataSource = await AppDataSource.initialize();
}

app();

