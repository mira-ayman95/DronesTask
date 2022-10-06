import { createConnection } from "typeorm";
import express from "express";
import * as path from "path";
import { validateEnv } from "./config";
validateEnv();
import { dbConnection } from "./config/connection";
import DroneRouter from "./routers/drones.router";


createConnection(dbConnection);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/drone', DroneRouter);

app.listen(process.env.PORT || 3000, () => {
    console.info(`=================================`);
    console.info(`======= ENV: ${process.env.NODE_ENV} =======`);
    console.info(`🚀 App listening on the port ${process.env.PORT}`);
    console.info(`=================================`);
});
module.exports = app;
