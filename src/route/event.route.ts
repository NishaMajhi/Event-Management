import express from "express";
import { addEvent, deleteEvent, getEventById, listEvents, updateEvent } from "../controller/event.controller";

const eventRouter = express.Router();

eventRouter.post('/', addEvent);
eventRouter.put('/:_id', updateEvent);
eventRouter.delete('/:_id', deleteEvent);
eventRouter.get('/:_id', getEventById);
eventRouter.get('/', listEvents);

export default eventRouter;
