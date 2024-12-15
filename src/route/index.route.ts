import express from "express";
import eventRouter from "./event.route"

const router = express.Router();

router.use("/events", eventRouter)

export default router;
