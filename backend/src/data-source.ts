import { DataSource } from "typeorm";
import User from "./entity/User";
import Like from "./entity/Like";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Sofya2002",
  database: "pinterest",
  synchronize: true,
  logging: true,
  entities: [User, Like],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;

