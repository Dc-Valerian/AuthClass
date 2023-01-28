import express, { Application } from "express";
import { appConfig } from "./app";
import { dbConfig } from "./config/DB";

const app: Application = express();

const port: number = 4040;

process.on("uncaughtException", (err: Error) => {
  console.log(`UncaughtException, server shutting down`);
  console.log(err.name, err.message);
  process.exit(1);
});

appConfig(app);

dbConfig();

const server = app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

process.on("unhandledRejection", (reason: any) => {
  console.log(`UnhandledRejection, server is shutting down`);
  console.log(reason.message, reason);
  server.close(() => {
    process.exit(1);
  });
});
