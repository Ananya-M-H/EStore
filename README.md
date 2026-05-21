# EStore

EStore is a full-stack e-commerce application built with a Node.js/Express backend and a React + Vite frontend.

## Features

- REST API backend with Express and MongoDB
- User authentication and authorization
- Product and category management
- Order creation, listing, and checkout flow
- Image uploads and file storage under `/uploads`
- PayPal configuration endpoint for frontend payment integration
- Admin dashboard pages for product, order, category, and user management
- Responsive React UI with Tailwind CSS and Flowbite
- State management using Redux Toolkit
- Routing with React Router v7
- Toast notifications with React Toastify

## Project Structure

- `backend/`
  - `index.js` - Express app entrypoint
  - `config/db.js` - MongoDB connection logic
  - `routes/` - API route definitions for users, products, categories, orders, uploads
  - `controllers/` - request handlers
  - `models/` - Mongoose schemas
  - `middlewares/` - auth, error handling, validation helpers
  - `uploads/` - static file upload destination
- `frontend/`
  - `src/` - React app source code
  - `src/pages/` - page components for shop, auth, orders, admin, user
  - `src/components/` - shared UI components
  - `src/redux/` - Redux slices and API service layer
  - `src/Utils/` - cart and localStorage utilities

## Requirements

- Node.js 18+ (or compatible)
- npm
- MongoDB instance

## Environment Variables

Create a `.env` file in the project root or backend folder with at least the following values:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PAYPAL_CLIENT_ID=<your-paypal-client-id>
PORT=8000
```

> Note: The backend currently listens on port `8000` and exposes static files from `/uploads`.

## Install Dependencies

From the project root:

```bash
npm install
npm install --prefix frontend
```

## Run the App

- Start both backend and frontend together:

```bash
npm run dev
```

- Start only the backend:

```bash
npm run backend
```

- Start only the frontend:

```bash
npm run frontend
```

## Frontend Scripts

From `frontend/`:

- `npm run dev` - start Vite development server
- `npm run build` - build production frontend
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## API Endpoints

- `POST /api/users` - user registration
- `POST /api/users/login` - user login
- `GET /api/users/profile` - get current user profile
- `GET /api/category` - category list
- `POST /api/category` - create category
- `GET /api/products` - list products
- `GET /api/products/:id` - product details
- `POST /api/upload` - upload images/files
- `POST /api/orders` - create new order
- `GET /api/orders` - list orders
- `GET /api/config/paypal` - get PayPal client ID

## Notes

- The frontend uses React 19, Vite, Tailwind CSS, Redux Toolkit, and React Router v7.
- The backend uses Express 5 and Mongoose for MongoDB integration.
- The app is structured so the root `npm run dev` command runs both servers concurrently.

## License

This project is provided under the ISC license.
