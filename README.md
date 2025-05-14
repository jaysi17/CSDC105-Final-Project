# Booking App

A Full-stack Booking App built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This app allows users to register, log in, and manage bookings for various places. It includes features like user authentication, photo uploads, and CRUD operations for places and bookings.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [Folder Structure](#folder-structure)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Screenshots](#screenshots)
9. [Future Improvements](#future-improvements)

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

### **Folder Structure**
booking-app/
├── api/                     # Backend folder
│   ├── models/              # Mongoose models (User, Place, Booking)
│   ├── uploads/             # Uploaded photos (if using local storage)
│   ├── index.js             # Main backend server file
│   └── .env                 # Environment variables
├── client/                  # Frontend folder
│   ├── src/
│   │   ├── pages/           # React pages (e.g., LoginPage, PlacesPage)
│   │   ├── App.jsx          # Main React app file
│   │   ├── index.css        # Global styles
│   │   ├── main.jsx         # React entry point
|   |   └── Other Components # Reusable react components
│   └── public/              # Static assets
└── README.md                # Project documentation

