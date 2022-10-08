import { createConnection } from "typeorm";
import express from "express";
import * as path from "path";
import cors from "cors";
import { validateEnv } from "./config";
validateEnv();
import { dbConnection } from "./config/connection";
import DroneRouter from "./routers/drones.router";
import fileUpload from "express-fileupload"
import * as fs from "fs/promises"


createConnection(dbConnection);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public/medication-images')));


app.post('/upload', fileUpload(), async function (req: any, res) {
    const file = req.files.file;
    const uploadPath = path.join(__dirname, `../public/medication-images/${file.name}`);
    await fs.writeFile(uploadPath, file.data)
    const imageUrl = `${process.env.HOST}:${process.env.PORT}/${file.name}`;
    res.status(201).send({ imageUrl, imagePath: file.name });
});

app.use('/drone', DroneRouter);

app.listen(process.env.PORT || 3000, () => {
    console.info(`=================================`);
    console.info(`======= ENV: ${process.env.NODE_ENV} =======`);
    console.info(`🚀 App listening on the port ${process.env.PORT}`);
    console.info(`=================================`);
});
module.exports = app;
