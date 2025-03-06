import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import mysql from 'mysql';

import useRoutes from './routes/routes.js';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
})

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ limit: "30 mb", extended: true }))

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("connection successfull");
    }
});

const port = process.env.PORT || 5001;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`server is running on port : ${port}`);
    }
})

app.use('/', useRoutes);