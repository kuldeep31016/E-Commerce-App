# Vibe Commerce — E-Commerce Cart (Full‑Stack)

> Full‑stack shopping cart app built for the Vibe Commerce screening.

---

## Project overview

This repository contains a minimal full‑stack shopping cart application (frontend + backend) that demonstrates common e‑commerce flows: listing products, adding/removing/updating cart items, calculating totals, and a mock checkout that returns a receipt. The implementation uses:

* **Frontend:** React (create‑react‑app or Vite)
* **Backend:** Node + Express
* **Database:** MongoDB (or SQLite as an alternative)
* **APIs:** REST endpoints

This README describes how to set up and run the project locally, the available API endpoints, folder structure, design notes, and suggestions for tests and demo video.

---

## Repo structure

```
/ (root)
├─ /backend        # Express API
│  ├─ package.json
│  ├─ src/
│  │  ├─ server.js
│  │  ├─ routes/
│  │  │  ├─ products.js
│  │  │  └─ cart.js
│  │  ├─ controllers/
│  │  ├─ models/   # Product, CartItem, (User)
│  │  └─ db/       # Mongo/SQLite connection
├─ /frontend       # React app
│  ├─ package.json
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ pages/Products.jsx
│  │  ├─ pages/Cart.jsx
│  │  ├─ components/
│  │  └─ services/api.js
├─ README.md
└─ .gitignore
```

---

## Quick start — Local (recommended)

> Instructions assume you have Node.js (v16+), npm or yarn, and optionally MongoDB installed. If you prefer SQLite, see the **Database** section.

### 1) Clone the repo

```bash
git clone https://github.com/kuldeep31016/E-Commerce-App.git
cd E-Commerce-App
```

### 2) Backend

```bash
cd backend
# install dependencies
npm install

# copy env example
cp .env.example .env
# update .env if needed (PORT, DB connection string)

# start backend
npm run dev
```

**Backend will run on** `http://localhost:5000` (or the PORT set in `.env`).

### 3) Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

**Frontend will run on** `http://localhost:3000` by default and proxy API requests to the backend.

---

## Environment variables

Create a `.env` in `/backend` with the following example values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/vibe_commerce
# or for SQLite, set DB_TYPE=sqlite and DB_FILE=./data/database.sqlite
```

If using the frontend proxy, add `REACT_APP_API_URL=http://localhost:5000/api` to the frontend `.env`.

---

## Backend — API reference

All endpoints are prefixed with `/api`.

### GET `/api/products`

Return 5–10 mock products (JSON array). Each item:

```json
{
  "id": "string",
  "name": "string",
  "price": number,
  "image": "optional string",
  "description": "optional"
}
```

### POST `/api/cart`

Add an item to the cart.
**Request body**:

```json
{ "productId": "<id>", "qty": number }
```

**Response**: current cart or created cart item.

### DELETE `/api/cart/:id`

Remove a cart item by its cart item id. Returns updated cart.

### GET `/api/cart`

Return the current cart with items, quantities, per‑item subtotal, and cart `total`.

**Example response**:

```json
{
  "items": [ { "id":"...", "productId":"...", "name":"...", "price":10, "qty":2, "subtotal":20 } ],
  "total": 20
}
```

### POST `/api/checkout`

Accepts `{ cartItems, name, email }` and returns a **mock receipt** with `total`, `receiptId`, and `timestamp`.

**Request**:

```json
{ "cartItems": [ {"productId":"...","qty":2} ], "name":"Alice", "email":"a@b.com" }
```

**Response**:

```json
{ "receiptId": "r_12345", "total": 123.45, "timestamp": "2025-10-30T...Z" }
```

> Note: no real payments — this endpoint only validates the cart, computes the total, stores a mock order record (optional), and returns the receipt object.

---

## Frontend — features

* **Products grid**: Fetch `/api/products`, display cards with `Add to Cart` button.
* **Cart view**: Shows items, editable qty, per‑item subtotal, remove buttons, and cart `total`.
* **Checkout form**: Collect `name` and `email`, submit to `/api/checkout`, then show a receipt modal with the returned receipt.
* **Responsive design**: Mobile and desktop-friendly layout.
* **Error handling**: Show user-friendly messages on API errors (network, validation).

---

## Database / Persistence

Options implemented or recommended:

* **MongoDB** (recommended): store `products` collection and `cart`/`orders` collections. Use Mongoose for models and simple CRUD.
* **SQLite** (alternative): a lightweight single‑file DB. Use `better-sqlite3` or `sqlite3` and a tiny ORM or raw SQL.

For the assignment, a simple in‑memory cart is acceptable, but to gain bonus points implement DB persistence for a mock user (e.g., `userId: test_user`).

---

## Bonus ideas (suggested)

* Integrate the Fake Store API ([https://fakestoreapi.com](https://fakestoreapi.com)) to fetch real sample products on startup or as a fallback.
* Add server‑side validation & robust error handling (400/422/500 responses).
* Add basic unit/integration tests for backend routes (Jest + Supertest) and frontend (React Testing Library).
* Implement non‑blocking optimistic UI updates on add/remove cart actions.

---

## Running tests (suggested)

**Backend**:

```bash
cd backend
npm test
```

(Write tests with Jest + Supertest covering endpoints: products, cart, checkout.)

**Frontend**:

```bash
cd frontend
npm test
```

(Test primary components: Products grid, Cart, Checkout flow.)

---

## Deliverables checklist

* [ ] GitHub repo with `/backend` and `/frontend`
* [ ] README with setup + screenshots
* [ ] 1–2 minute demo video (Loom or unlisted YouTube) showing: adding items, updating qty, removing items, checkout → receipt
* [ ] (Bonus) DB persistence for cart and orders
* [ ] (Bonus) Error handling and Fake Store API integration

---

## Screenshots

*(Add screenshots of the product grid, cart view, and receipt modal here.)*

---

## Demo video

Record a 1–2 minute walkthrough showing the main flows (Products → Add to Cart → Cart → Checkout → Receipt). Upload to Loom or YouTube (unlisted) and paste the link in the README.

---

## Notes for reviewers / interviewer

* The app uses REST APIs and a small, well‑documented backend. You can run the project locally with minimal setup.
* No real payment provider is involved — checkout returns a mock receipt object with timestamp.
* If using MongoDB, seed the database with 5–10 products on server start (see `scripts/seed.js`).

---

## How I implemented this assignment

*(Write a short paragraph here describing your implementation choices, tech decisions, and tradeoffs — e.g., "I used MongoDB + Mongoose for persistence and created REST routes in Express; the frontend is React with context to manage cart state and calls the backend for persistence.")*

---

## Contact

If you want to run into issues, open an issue in this repository or contact me at `your-email@example.com`.

---

> Good luck — feel free to ask if you want me to also generate seed data, the Express route templates, or the React components for this project.

