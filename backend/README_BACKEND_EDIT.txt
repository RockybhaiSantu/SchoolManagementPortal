Backend edits done:
- Added routes/forgot.js -> POST /api/auth/forgot-password (simple handler logging request)
- Added controllers/routes for classes and timetable:
  - GET/POST/DELETE /api/classes  (seeds Class 1..10 on first GET)
  - GET/POST/DELETE /api/timetable
- server.js updated to register new routes (if found)
- node_modules removed from package to keep zip small

Next steps locally:
1) Ensure config/db.js is correct and points to your MySQL server/database.
2) Run `npm install` inside backend folder.
3) Start server: `npm start`.
4) Verify endpoints (e.g., GET http://localhost:5000/api/classes).

If server.js wasn't auto-updated, manually import and use the new routes as shown in server.js.
