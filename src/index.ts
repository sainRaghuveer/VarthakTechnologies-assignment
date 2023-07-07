import express from "express"
const cors = require("cors");
import dotenv from "dotenv";
dotenv.config() as string;
import winston from "winston";
import {Request, Response, NextFunction} from "express"
import userRouter from "./routes/auth.route"
import bookRouter from "./routes/book.route"
import connectDB from "./config/db";

// Configure logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/api.log" }),
    ],
});

// Logging middleware
const loggingMiddleware: express.Handler = (req:Request, res:Response, next:NextFunction) => {
    logger.info(`[${req.method}] ${req.url}`);
    next();
};


const app = express();


app.get("/", (req, res) => {
    res.send("Home page");
});


app.use(cors());
app.use(express.json());

//logger middleware
app.use(loggingMiddleware);

//Routes
app.use("/", userRouter);
app.use("/", bookRouter)


const PORT = process.env.PORT || 5000 as number;

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Connected with DB`);
        console.log(`Server running prot ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});