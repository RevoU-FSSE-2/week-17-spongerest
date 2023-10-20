import functions from "firebase-functions";
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute  from "./routes/booksRoute.js"
import cors from "cors"

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: 'https://week-17-restu.web.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

app.get('/', (req,res) => {
    console.log(req)
    return res.status(234).send(`Welcome MADAFAKA`)
});

app.use('/books', booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log(`App Connected to DataBase`)
        app.listen(PORT, () => {
            console.log(`App Listening to PORT ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error)
    })

export const restu = functions.https.onRequest(app);