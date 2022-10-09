require('express-async-errors');
import { createConnection } from "typeorm";
import express, { NextFunction, Request, Response } from "express";
import * as path from "path";
import cors from "cors";
import { validateEnv } from "./config";
validateEnv();
import { dbConnection } from "./config/connection";
import DroneRouter from "./routers/drones.router";
import fileUpload from "express-fileupload"
import * as fs from "fs/promises"
import { GlobalError } from "./interfaces/exceptions.interface";
import helmet from "helmet";
import { BadRequestException } from "./utils/exceptions/bad-request.exception";


createConnection(dbConnection);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public/medication-images')));


app.post('/upload', fileUpload({ abortOnLimit: true, limits: { fileSize: 50 * 1024 * 1024 } }), async function (req: any, res) {
    const file = req.files.file;
    const fileType = req.files.file.mimetype;

    const indexOfType = fileType.indexOf("/");
    const extension = fileType.substring(indexOfType + 1);
    if (!["jpg", "jpeg", "jfif", "pjpeg", "pjp", "png"].includes(extension)) throw new BadRequestException(`Wrong File Type only images accpeted`);

    const uploadPath = path.join(__dirname, `../public/medication-images/${file.name}`);
    await fs.writeFile(uploadPath, file.data)
    const imageUrl = `${process.env.HOST}:${process.env.PORT}/${file.name}`;
    return res.status(201).send({ imageUrl, imagePath: file.name });
});

app.use(["/drone", "/drones"], DroneRouter);

app.use((err: GlobalError, req: Request, res: Response, next: NextFunction) => {
    if (err.status) {
        return res.status(err.status).send({
            error: err.message,
            ...err.errorType ? { errorType: err.errorType } : {}
        });
    }
    console.log("Internal server error", err);
    return res.status(500).send({ error: "Something went wrong" });
});

app.listen(process.env.PORT || 3000, () => {
    console.info(`=================================`);
    console.info(`======= ENV: ${process.env.NODE_ENV} =======`);
    console.info(`🚀 App listening on the port ${process.env.PORT}`);
    console.info(`=================================`);
});
module.exports = app;
