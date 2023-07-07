const express = require("express");
const cors = require("cors");
import dotenv from "dotenv";
dotenv.config() as string;
import userRouter from "./routes/auth.route"
import bookRouter from "./routes/book.route"
const app = express();

import connectDB from "./config/db";


app.use(cors());
app.use(express.json());

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