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

//Creating app using express
const app = express();


//Default route
app.get("/", (req, res) => {
    res.send(`<div style="text-align:center; color:blue; font-size:25px; ">Welcome to the VARTHAK backend ...!🪄🪄🪄🪄</div>`);
});

//Cross origin
app.use(cors());

//Body parser
app.use(express.json());

//logger middleware
app.use(loggingMiddleware);

//Routes
app.use("/", userRouter);
app.use("/", bookRouter)

//PORT
const PORT = process.env.PORT || 5000 as number;

//Server    
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Connected with DB`);
        console.log(`Server running prot ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});