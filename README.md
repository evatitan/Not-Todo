# NOT-TODO-APP

A full-stack web application to help you track things you **should NOT do**!  
Built with React (frontend) and Node.js/Express/MySQL (backend).

---

## Features

- User registration and login (with sessions)
- Add, view, and delete "Not-To-Do" items
- User profile page
- Secure password hashing
- RESTful API
- Responsive frontend with React

---

## Project Structure

```
NOT-TODO-APP/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── initDB.js
│   │   └── schema.sql
│   ├── middleware/
│   ├── index.js
│   ├── .env
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── index.js
│   ├── package.json
│   └── ...
└── README.md
```

---

## Backend Setup

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```

2. **Configure environment variables:**  
   Create a `.env` file in `/backend`:
   ```
   MYSQL_URL=mysql://user:password@host:port/database
   HTTP_PORT=4000
   HTTP_ADDR=localhost
   ```

3. **Initialize the database:**
   ```sh
   node config/initDB.js
   ```
   Or import `config/schema.sql` into your MySQL server.

4. **Start the backend server:**
   ```sh
   node index.js
   ```
   The API will run at `http://localhost:4000`.

---

## Frontend Setup

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```

2. **Start the frontend:**
   ```sh
   npm start
   ```
   The app will run at `http://localhost:3000` and proxy API requests to the backend.

---

## Debugging

- **Backend:**  
  Use VS Code’s debugger with a `.vscode/launch.json` like:
  ```json
  {
    "type": "pwa-node",
    "request": "launch",
    "name": "Debug Backend",
    "program": "${workspaceFolder}/backend/index.js",
    "envFile": "${workspaceFolder}/backend/.env"
  }
  ```
  Set breakpoints in your backend code and start debugging from VS Code.

---

## API Endpoints

- `POST /api/register` — Register a new user
- `POST /api/login` — Login
- `POST /api/logout` — Logout
- `GET /api/profile` — Get current user profile
- `GET /api/not-todos` — List all not-to-do items for the user
- `POST /api/not-todos` — Add a new not-to-do item
- `GET /api/not-todos/:id` — Get a specific not-to-do item
- `DELETE /api/not-todos/:id` — Delete a not-to-do item

---

## License

MIT

---

**Enjoy your NOT-TODO-APP!**
