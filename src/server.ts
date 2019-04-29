import "reflect-metadata";
import http from "http";
import express from "express";
import { createConnection } from "typeorm";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services";
import middleware from "./middleware";



createConnection().then(async connection => {
  await connection.synchronize();

  const router = express();
  applyMiddleware(middleware, router);
  applyRoutes(routes, router);

  const { PORT = 3000 } = process.env;
  const server = http.createServer(router);

  server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
  );
}).catch(error => console.log(error));