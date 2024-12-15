# 🚀 Event-Management

## 📜 Description
Event Management is a **RESTful API** project built using **Node.js**, **Express**, **TypeScript**, and **MongoDB**. This application allows users to manage event-related operations seamlessly by offering endpoints for:

- ✅ Creating  
- ✅ Retrieving  
- ✅ Updating  
- ✅ Deleting  
- ✅ Filtering events based on certain criteria.

The goal of this project is to provide a **clean**, **well-structured**, and **modular architecture** for managing events, enabling users to handle event details such as names, dates, organizers, venue details, and other related attributes.

---

## 🛠️ Features
### 📌 The key features include:
1. **Create a New Event**: Add a new event with details like name, date, organizer contact information, and venue details.  
2. **Update an Event**: Modify the information of an existing event by providing its unique identifier.  
3. **Delete an Event**: Remove an event from the database using its unique identifier.  
4. **Retrieve Event by ID**: Fetch the details of a specific event by querying its unique identifier.  
5. **List Events with Optional Filters**: Dynamically filter and list events based on criteria such as:
   - Date  
   - Location (city, state, zip code)  
   - Organizer name  

---

## 🛠️ Data Structure
### The `Event` Model Object structure is defined as:
```typescript
{
  "id": "string", // Unique identifier for the event
  "eventName": "string", // Name of the event
  "eventDate": "Date", // Date of the event
  "organizer": "string", // Organizer's name
  "email": "string", // Email of the organizer
  "phone": "string", // Phone number of the organizer
  "location": {
    "street": "string", // Venue street address
    "city": "string", // Venue city
    "state": "string", // Venue state
    "zip": "string" // Venue zip code
  },
  "createdAt": "Date", // Timestamp when the event was created
  "updatedAt": "Date" // Timestamp when the event was last updated
}
```

## 📚 API Endpoints
1️⃣ Create a New Event
Endpoint:
POST /api/v1/events/

Description:
Adds a new event to the database.

Request Body Example:
{
  "eventName": "Tech Conference 2024",
  "eventDate": "2024-12-20T10:00:00.000Z",
  "organizer": "Nisha Majhi",
  "email": "nishamajhi@example.com",
  "phone": "123-456-7890",
  "location": {
    "street": "kohinoor mall",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zip": "400072"
  }
}


2️⃣ Update an Existing Event
Endpoint:
PUT /api/v1/events/:id

Description:
Updates an event by its unique identifier.

Request Body Example:
{
  "eventName": "Tech Fest 2024",
  "eventDate": "2024-12-22T12:00:00.000Z"
}


3️⃣ Delete an Event
Endpoint:
DELETE /api/v1/events/:id

Description:
Deletes an event by its unique identifier.


4️⃣ Retrieve Event by ID
Endpoint:
GET /api/v1/events/:id

Description:
Fetches a single event's details by its unique identifier.


5️⃣ List All Events with Optional Filters
Endpoint:
GET /api/v1/events/

Filters Supported:
1. city: Filter events by city (case-insensitive).
2. state: Filter events by state (case-insensitive).
3. organizer: Filter events by the organizer's name (case-insensitive).


## ⚙️ Technologies Used
1. 🟩 Backend:
    1. Node.js with Express.js
    2. TypeScript for static typing
    3. MongoDB as the database
    4. Mongoose (ORM for MongoDB)
2. 🔐 Environment Variables:
    1. dotenv for environment configuration.



