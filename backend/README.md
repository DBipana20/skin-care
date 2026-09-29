# GlowTrack Skincare & Wellness — Backend API

Modern Node.js & Express REST API for the GlowTrack Skincare web application.

## Features
- **Zero-Setup Persistent Storage**: Automatic atomic JSON persistence in `data/store.json`, pre-seeded from `data/initialData.json`.
- **Full Skincare Feature Suite**:
  - **User & Skin Profile**: Personal info, skin type, rosacea/dullness concerns, morning/evening routine reminder times.
  - **Routine Regimens**: Morning & Evening routine step checklists with instant completion toggling and progress calculation.
  - **Diet & Hydration**: 8-glass water tracker and dynamic food logs (Skin Loving & Watch Out).
  - **Product Catalog**: Full product directory with search, category filtering, and favorite toggling.
  - **Monthly Consistency**: Streak calculation and calendar heatmaps.
  - **Bootstrap Endpoint**: Single-roundtrip `/api/init` for rapid client loading.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Server
```bash
# Production mode
npm start

# Development mode with auto-reload (Node.js 18+)
npm run dev
```

The API will be running at `http://localhost:5000`.

### 3. Run Automated API Tests
```bash
npm test
```

## API Endpoints

### System & Bootstrap
- `GET /api/health` — API health check
- `GET /api/init` — Full state bootstrap for client initial load

### User & Profile
- `GET /api/user` — Get user profile, skin type, concerns, and reminders
- `PUT /api/user` — Update user profile (`{ name, email, avatar }`)
- `PUT /api/user/skintype` — Update skin type (`{ skinType }`)
- `POST /api/user/concerns` — Add concern (`{ concern }`)
- `DELETE /api/user/concerns/:concern` — Remove concern
- `PUT /api/user/reminders` — Update reminder settings (`{ enabled, morningTime, eveningTime }`)

### Routines
- `GET /api/routines` — Get morning & evening routine step lists and progress stats
- `PATCH /api/routines/:type/steps/:id/toggle` — Toggle step completion (`:type` is `morning` or `evening`)
- `POST /api/routines/:type/steps` — Add a custom routine step
- `DELETE /api/routines/:type/steps/:id` — Delete a routine step

### Hydration
- `GET /api/hydration` — Get daily water intake glasses (0-8)
- `PUT /api/hydration` — Update water glasses count (`{ waterGlasses }`)

### Diet & Nutrition
- `GET /api/diet` — Get skin-loving and watch-out food lists
- `POST /api/diet` — Add food entry (`{ name, category }`)
- `DELETE /api/diet/:category/:name` — Remove food entry

### Products
- `GET /api/products` — Get products (optional query parameters: `?category=...&search=...`)
- `GET /api/products/:id` — Get single product details
- `PATCH /api/products/:id/favorite` — Toggle product favorite
- `POST /api/products` — Add a product
- `DELETE /api/products/:id` — Delete a product

### Progress & Streaks
- `GET /api/progress` — Get streak days, longest streak, and consistency heatmap
- `PUT /api/progress/streaks` — Update streaks (`{ streakDays, longestStreak }`)
