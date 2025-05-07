# Simple Note-Taking Application with Cat Facts (Backend)

This is the backend for a simple note-taking application built using the **Express** (MongoDB, Express.js, Node.js). Each note is associated with a random **cat fact** fetched from [Cat Fact API](https://catfact.ninja/fact) every time a new note is created.


## Features

- Create a note with a random cat fact
- Retrieve all active notes
- Soft delete a note (`isDeleted` flag)
- Search notes by title, content, or catfact
- Input validation with `express-validator`
- Winston logging (console + file)
- Error handling middleware

## API Endpoints

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| POST   | /api/notes       | Create a new note          |
| GET    | /api/notes       | Get all notes              |
| DELETE | /api/notes/:id   | Delete a note by ID        |
| GET    | /api/notes/search?q= | Search notes by text   |


## Input Validation

- `title`: required, max 100 characters
- `content`: required
- `id` in URL param must be a valid MongoDB ObjectId
- `q` (search query): min 2 characters

## Logging

- The backend uses Winston for logging.
- Logs are stored in the logs/ directory, including:
- error.log: Stores error logs.
- combined.log: Stores general logs, including request details and successful operations.
- Logs are printed to the console in development environments, with colorized output for better readability.

## Postman Collection

You can test the API using this [Postman Collection](#) (Attached to same directory `Note Take.postman_collection.json` file).

## Future Improvements

- Add authentication (JWT)
- Rate limiting and security headers
- Dockerize and add CI/CD

## How To Run Application 

### 1. Clone the repository: Run below commands and follow the steps in bash terminal

```bash 

git clone https://github.com/rahulkumar1907/note-taker.git
cd note-taker
npm install

Create a .env file in the root of the backend folder(note-taker) with the following content:
PORT=5000
MONGO_URI=mongodb+srv://**hul******:<password>@cluster0.cjq8k.mongodb.net/note-taker
NODE_ENV=development


npm start     (production mode)    or  npm run start       (development mode)



The server will be running on http://localhost:5000.

API Endpoints
1. POST /api/notes - Create a new note

Request Body: 
{
  "title": "Note Title",
  "content": "This is the content of the note."
}
Response:   
{
    "status": true,
    "message": "Notes created successfully",
    "data": {
        "title": "Meeting Notes Test 6",
        "content": "Discuss project milestones and next steps Test 6.",
        "catfact": "Default cat fact if API fails.",
        "isDeleted": false,
        "_id": "681bb07ccd70356cdcbaa76f",
        "createdAt": "2025-05-07T19:11:57.123Z",
        "updatedAt": "2025-05-07T19:11:57.123Z",
        "__v": 0
    }
}


2. GET /api/notes - Get all notes (excluding deleted ones)

Response:    
 {
    "status": true,
    "message": "All notes retrieved successfully",
    "data": [
        {
            "_id": "681ba64d3128206efadc5608",
            "title": "Meeting Notes Test 2",
            "content": "Discuss project milestones and next steps Test 2.",
            "catfact": "Default cat fact if API fails.",
            "isDeleted": false,
            "createdAt": "2025-05-07T18:28:29.520Z",
            "updatedAt": "2025-05-07T18:28:29.520Z"
        },
        {
            "_id": "681ba68bcd77120438496aef",
            "title": "Meeting Notes Test 3",
            "content": "Discuss project milestones and next steps Test 3.",
            "catfact": "Lions are the only cats that live in groups, called prides. Every female within the pride is usually related.",
            "isDeleted": false,
            "createdAt": "2025-05-07T18:29:31.267Z",
            "updatedAt": "2025-05-07T18:29:31.267Z"
        },
        {
            "_id": "681ba695cd77120438496af1",
            "title": "Meeting Notes Test 4",
            "content": "Discuss project milestones and next steps Test 4.",
            "catfact": "Perhaps the most famous comic cat is the Cheshire Cat in Lewis Carroll’s Alice in Wonderland. With the ability to disappear, this mysterious character embodies the magic and sorcery historically associated with cats.",
            "isDeleted": false,
            "createdAt": "2025-05-07T18:29:41.439Z",
            "updatedAt": "2025-05-07T18:29:41.439Z"
        },
        {
            "_id": "681ba6a0cd77120438496af3",
            "title": "Meeting Notes Test 5",
            "content": "Discuss project milestones and next steps Test 5.",
            "catfact": "On average, cats spend 2/3 of every day sleeping. That means a nine-year-old cat has been awake for only three years of its life.",
            "isDeleted": false,
            "createdAt": "2025-05-07T18:29:52.860Z",
            "updatedAt": "2025-05-07T18:29:52.860Z"
        },
        {
            "_id": "681bb07ccd70356cdcbaa76f",
            "title": "Meeting Notes Test 6",
            "content": "Discuss project milestones and next steps Test 6.",
            "catfact": "Default cat fact if API fails.",
            "isDeleted": false,
            "createdAt": "2025-05-07T19:11:57.123Z",
            "updatedAt": "2025-05-07T19:11:57.123Z"
        }
    ]
}


3. DELETE /api/notes/:id - Soft delete a note

Response:
{
    "status": true,
    "message": "Note deleted successfully"
}

4. GET /api/notes/search?q=<query> - Search for notes by title, content, or catfact

Response: 
{
    "status": true,
    "message": "Search result retrieved successfully",
    "data": [
        {
            "_id": "681ba68bcd77120438496aef",
            "title": "Meeting Notes Test 3",
            "content": "Discuss project milestones and next steps Test 3.",
            "catfact": "Lions are the only cats that live in groups, called prides. Every female within the pride is usually related.",
            "isDeleted": false,
            "createdAt": "2025-05-07T18:29:31.267Z",
            "updatedAt": "2025-05-07T18:29:31.267Z"
        }
    ]
}

