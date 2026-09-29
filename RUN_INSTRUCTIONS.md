# How to Run GlowTrack Backend and Frontend Together

This guide outlines how to start both the **Node.js Express Backend** (port `5000`) and the **React Vite Frontend** (port `5173`) together.

---

## 🟢 Current Live Status

Both servers are **already active and running** on your laptop right now:

| Service | Local URL | Description |
|---|---|---|
| **Frontend Web App** | [http://localhost:5173](http://localhost:5173) | Skincare & Wellness React UI |
| **Backend REST API** | [http://localhost:5000/api](http://localhost:5000/api) | Express API & Data Storage |
| **API Health Check** | [http://localhost:5000/api/health](http://localhost:5000/api/health) | Status: Operational (`ok`) |

> [!TIP]
> Open **[http://localhost:5173](http://localhost:5173)** in Chrome or Edge to use the app right now.

---

## 🚀 Option 1: Run Both Together with One Command (Recommended)

You can launch both the backend and frontend simultaneously with unified logging.

### Method A: Using Node.js (Works in any terminal)
Open PowerShell or Command Prompt in the root folder (`skincare`):
```powershell
node start-dev.js
```
*(Press `Ctrl + C` at any time to stop both servers gracefully.)*

### Method B: One-Click on Windows
In Windows File Explorer, navigate to `skincare` and **double-click** on:
```
start-dev.bat
```

### Method C: Using npm
From the root `skincare` directory:
```powershell
npm.cmd run dev
```

---

## 🛠️ Option 2: Run in Two Separate Terminals

If you prefer separate terminal windows for each process:

### Terminal 1 — Backend Server
```powershell
cd c:\Users\dbipa\OneDrive\Desktop\skincare\backend
npm.cmd start
```
* The backend will initialize the database store and start on **`http://localhost:5000`**.
* For auto-reloading during development: `npm.cmd run dev`

### Terminal 2 — Frontend App
```powershell
cd c:\Users\dbipa\OneDrive\Desktop\skincare\frontend
npm.cmd run dev
```
* Vite will launch the web application at **`http://localhost:5173`**.
* All `/api/*` requests will automatically proxy to `http://localhost:5000`.

---

## ⚡ Windows PowerShell Tip

On Windows systems where script execution policies are restricted (`PSSecurityException`), always use:
- `npm.cmd` instead of `npm`
- `npx.cmd` instead of `npx`

*Example:* `npm.cmd install`, `npm.cmd run dev`

---

## 🧪 Testing & Verification

To verify that all backend endpoints and storage are working:
```powershell
cd c:\Users\dbipa\OneDrive\Desktop\skincare\backend
node scripts/testApi.js
```
Expected output:
```
✓ Database initialized
✓ GET /api/health returned 200 OK
✓ GET /api/init returned bootstrap data
✓ PATCH /api/routines/morning/steps/1/toggle works
✓ PUT /api/hydration updated waterGlasses to 6
✓ POST /api/diet added Chia Seeds to skinLovingFoods
✓ PATCH /api/products/1/favorite toggled isFavorite
✓ PUT /api/user/skintype updated skinType to Sensitive
```

---

## 📁 Project Structure Overview

```
skincare/
├── start-dev.js            <-- Launches both backend & frontend together
├── start-dev.bat           <-- One-click Windows launcher
├── package.json            <-- Root workspace scripts
├── RUN_INSTRUCTIONS.md     <-- This guide
│
├── backend/                <-- Express REST API
│   ├── data/
│   │   ├── initialData.json  <-- Initial seed data
│   │   └── store.json        <-- Live persistent database (auto-saved)
│   ├── src/
│   │   ├── server.js         <-- Server entry point (Port 5000)
│   │   ├── app.js            <-- Express app & middleware
│   │   ├── db/database.js    <-- Atomic JSON database
│   │   ├── controllers/      <-- Routine, user, hydration, product controllers
│   │   └── routes/           <-- REST route endpoints
│   └── package.json
│
└── frontend/               <-- React + Vite Web App
    ├── vite.config.js        <-- Proxy configuration for /api
    ├── src/
    │   ├── services/api.js   <-- Client communication layer
    │   ├── context/          <-- AppContext state synced to API
    │   ├── pages/            <-- Dashboard, Routines, Products, Hydration, etc.
    │   └── components/
    └── package.json
```
