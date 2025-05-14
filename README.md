# Booking App

A Full-stack Booking App built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This app allows users to register, log in, and manage bookings for various places. It includes features like user authentication, photo uploads, and CRUD operations for places and bookings.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Future Improvements](#future-improvements)
8. [Full Documentation](#full-documentation)

---

## Overview

The **Booking App** is a platform where users can:
- Register and log in to their accounts.
- Add, edit, and delete places they own.
- View and book places listed by other users.
- Manage their bookings and view booking details.

This app is designed to be user-friendly and responsive, making it accessible on both desktop and mobile devices.

---

## Features

### User Features:
- **Authentication**: Register and log in securely using JWT-based authentication.
- **Profile Management**: View and manage user profile details.
- **Place Management**:
  - Add new places with photos.
  - Edit or delete existing places.
- **Booking Management**:
  - Book places for specific dates.
  - View and manage bookings.

### Admin Features:
- **CRUD Operations**: Manage all places and bookings.
- **Photo Uploads**: Upload photos for places using Cloudinary or local storage.

### Additional Features:
- **Responsive Design**: Fully responsive UI for desktop and mobile.
- **Dynamic Photo Galleries**: View and manage photos for each place.
- **Secure API**: Backend API with authentication and authorization.
- **Sorting Places**: Sort places by price (low to high, high to low) or by date (oldest only) for better user experience.
---

## Technologies Used

### Frontend:
- **React.js**: For building the user interface.
- **React Router**: For navigation and routing.
- **Axios**: For making HTTP requests.
- **Tailwind CSS**: For styling the application.

### Backend:
- **Node.js**: For building the server.
- **Express.js**: For handling API routes.
- **MongoDB**: For storing user, place, and booking data.
- **Mongoose**: For interacting with the MongoDB database.
- **JWT**: For secure user authentication.
- **Cloudinary**: For photo uploads and storage.

---

## Setup Instructions

### Prerequisites:
- Node.js installed on your machine.
- MongoDB installed locally or a MongoDB Atlas account.
- A Cloudinary account (optional for photo uploads).

### Steps to Run the App:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jaysi17/CSDC105-Final-Project.git
   cd CSDC105-Final-Project

2. **Install Dependencies**:
    - Backend
    ```bash
    cd api 
    npm install
    ```
    - Frontend
    ```bash
    - cd ../client
    - npm install

3. **Start the backend server**:
    ```bash
    cd api
    nodemon index.js

4. **Start the frontend server**:
    ```bash
    cd client
    npm run dev

---

## Usage

### Adding a New Place
1. Log in to your account.
2. Navigate to the **"My Places"** page.
3. Click the **"Add New Place"** button.
4. Fill in the required details and upload photos.
5. Click **Save** to list your place.

### Booking a Place
1. Browse the list of available places.
2. Select a place that suits your needs.
3. Choose your **check-in** and **check-out** dates.
4. Confirm the booking.

### Managing Bookings
1. Go to the **"My Bookings"** page.
2. View details of your current and past bookings.
3. Cancel a booking if needed.

---

## API Endpoints

### Authentication:
- **POST /register**: Register a new user.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - **Response**: User object.

- **POST /login**: Log in a user.
  - **Request Body**:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - **Response**: User object and JWT token in a cookie.

- **GET /profile**: Get the logged-in user's profile.
  - **Response**: User object (name, email, ID).

- **POST /logout**: Log out the user.
  - **Response**: Success message.

---

### Places:
- **POST /places**: Add a new place.
  - **Request Body**:
    ```json
    {
      "title": "Cozy Apartment",
      "address": "123 Main St, City",
      "photos": ["photo1.jpg", "photo2.jpg"],
      "description": "A beautiful place to stay.",
      "perks": ["WiFi", "Parking"],
      "extraInfo": "No pets allowed.",
      "checkIn": 14,
      "checkOut": 11,
      "maxGuests": 4,
      "price": 100
    }
    ```
  - **Response**: Place object.

- **GET /places**: Get all places.
  - **Response**: Array of place objects.

- **GET /user-places**: Get all places owned by the logged-in user.
  - **Response**: Array of place objects.

- **GET /places/:id**: Get a specific place by its ID.
  - **Response**: Place object.

- **PUT /places**: Update an existing place.
  - **Request Body**:
    ```json
    {
      "id": "placeId",
      "title": "Updated Title",
      "address": "Updated Address",
      "photos": ["updatedPhoto1.jpg"],
      "description": "Updated description.",
      "perks": ["WiFi"],
      "extraInfo": "Updated info.",
      "checkIn": 15,
      "checkOut": 10,
      "maxGuests": 3,
      "price": 120
    }
    ```
  - **Response**: Success message.

- **DELETE /places/:id**: Delete a place by its ID.
  - **Response**: Success message.

---

### Bookings:
- **POST /bookings**: Create a new booking.
  - **Request Body**:
    ```json
    {
      "place": "placeId",
      "checkIn": "2025-05-01",
      "checkOut": "2025-05-05",
      "numberOfGuests": 2,
      "name": "John Doe",
      "phone": "1234567890",
      "price": 500
    }
    ```
  - **Response**: Booking object.

- **GET /bookings**: Get all bookings for the logged-in user.
  - **Response**: Array of booking objects.

---

### Image Uploads:
- **POST /upload-by-link**: Upload an image via a link.
  - **Request Body**:
    ```json
    {
      "link": "https://example.com/image.jpg"
    }
    ```
  - **Response**: Uploaded image filename or URL.

- **POST /upload**: Upload images from the client.
  - **Request**: Multipart form data with images.
  - **Response**: Array of uploaded image URLs.

---

### Miscellaneous:
- **GET /test**: Test the server.
  - **Response**: `"test ok"`

## Future Improvements

1. **Search Functionality**:
   - Add a search bar to allow users to search for places by name, location, or keywords.

2. **Advanced Filters**:
   - Implement filters for price range, number of guests, amenities (WiFi, parking, etc.), and ratings.

3. **Payment Integration**:
   - Integrate payment gateways like GCASH or Maya for secure online payments.

4. **User Reviews and Ratings**:
   - Allow users to leave reviews and ratings for places they have booked.

5. **Favorites/Wishlist**:
   - Add a feature for users to save their favorite places for future reference.

6. **Notifications**:
   - Implement email or SMS notifications for booking confirmations, reminders, and updates.

7. **Admin Dashboard**:
   - Create an admin panel to manage users, places, and bookings more efficiently.

8. **Multi-Language Support**:
   - Add support for multiple languages to make the app accessible to a global audience.

9. **Dark Mode**:
   - Add a toggle for light/dark mode to enhance user experience.

10. **Map Integration**:
    - Integrate a map (e.g., Google Maps or Leaflet) to display the location of places visually.

11. **Discounts and Promotions**:
    - Allow hosts to offer discounts for specific dates or long stays.

---

## Full Documentation

For detailed documentation, including the technical details, and term paper, visit the link below:

[StayConnect - CSDC105 Final Project Documentation](https://www.notion.so/StayConnect-CSDC105-Final-Project-Documentation-Term-Paper-1f057e3ff40681238c2ec6732a2da29a)