import { DataSource } from "typeorm";
// import Customer from "./entity/Customer";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Sofya2002",
  database: "finam",
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;

