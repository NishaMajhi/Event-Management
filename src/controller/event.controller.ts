import { Request, Response } from 'express';
import Event from '../model/event.model';

// Add a new event
export const addEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventName, eventDate, organizer, email, phone, location } = req.body;

        if (!eventName || !eventDate || !organizer || !email || !phone || !location) {
            res.status(400).json({
                message: 'Validation failed',
                error: 'Missing required fields: eventName, eventDate, organizer, email, phone, and location are required.',
            });
            return;
        }

        const { street, city, state, zip } = location;
        if (!street || !city || !state || !zip) {
            res.status(400).json({
                message: 'Validation failed',
                error: 'Missing required fields in location: street, city, state, and zip are required.',
            });
            return;
        }

        const newEvent = new Event({
            eventName,
            eventDate,
            organizer,
            email,
            phone,
            location: { street, city, state, zip },
        });

        const savedEvent = await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: savedEvent });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create event',
            error: error instanceof Error ? error.message : error,
        });
    }
};


// Delete an event
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id } = req.params;
        const deletedEvent = await Event.findOneAndDelete({ _id });
        if (!deletedEvent) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        res.status(200).json({ message: 'Event deleted successfully', event: deletedEvent });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete event',
            error: error instanceof Error ? error.message : error,
        });
    }
};

// Retrieve an event by ID
export const getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id } = req.params;
        const event = await Event.findOne({ _id });
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetching event',
            error: error instanceof Error ? error.message : error,
        });
    }
};


// Update an existing event
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id } = req.params;

        if (!_id) {
            res.status(400).json({ message: 'Event ID is required in the request parameters' });
            return;
        }

        const updatedEvent = await Event.findOneAndUpdate(
            { _id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            res.status(404).json({ message: `Event with ID ${_id} not found` });
            return;
        }

        res.status(200).json({
            message: 'Event updated successfully',
            event: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update event',
            error: error instanceof Error ? error.message : error,
        });
    }
};


// List all events with optional filters
export const listEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters: { [key: string]: any } = {};

        for (const key in req.query) {
            if (req.query[key]) {
                if (['city', 'street', 'state', 'zip'].includes(key)) {
                    filters[`location.${key}`] = { $regex: req.query[key], $options: 'i' };
                } else if (key === 'eventName' || key === 'organizer') {
                    filters[key] = { $regex: req.query[key], $options: 'i' };
                } else {
                    filters[key] = req.query[key];
                }
            }
        }

        const events = Object.keys(filters).length === 0
            ? await Event.find()
            : await Event.find(filters);

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch events',
            error: error instanceof Error ? error.message : error,
        });
    }
};
