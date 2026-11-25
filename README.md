# The Marlow — Full-Stack Hotel & Food Management Suite

## Folder Structure
- `config/db.js` — MySQL connection pool
- `server.js` — Express REST API & static file server
- `app.js` — Frontend API sync logic
- `The-Marlow-Phone-And-Laptop-v5.html` — Connected frontend UI
- `schema.sql` — MySQL database schema & seed data
- `.env` — MySQL database configuration

## Quick Start
1. Open `.env` and set your `DB_PASSWORD` (if your MySQL root user has a password).
2. Import `schema.sql` into MySQL:
   `mysql -u root -p < schema.sql`
3. Install packages and start the server:
   `npm install`
   `npm start`
4. Open in browser:
   `http://localhost:5000`
