import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";
import eventRouter from "./route/event.route";
dotenv.config();
connectDB();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/api/v1/events", eventRouter)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Event Management" })
})

export default app;



