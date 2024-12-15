import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./src/config/db";
import eventRouter from "./src/route/event.route";
dotenv.config();
connectDB();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Event Management" })
})

app.use("/api/v1/events", eventRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
})
