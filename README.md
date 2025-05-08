# Post Management API

A RESTful API for managing posts, built with **Express.js**, **MongoDB**, and **JWT Authentication**. This API allows authenticated users to create and retrieve posts, while unauthenticated users are restricted from creating posts.

---

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)

---

## Installation

### Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** (>= 14.x)
- **npm** (Node Package Manager)
- **MongoDB** (either locally or through MongoDB Atlas)

### Steps to Install

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/post-management-api.git
    cd social-media-post-system
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

---

## Configuration

### Environment Variables

To configure the application, create a `.env` file in the root directory and add the following variables:

```bash
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb://localhost:27017/your_db_name
PORT=8080
```

### Running the Application

To run the application, execute the following command:

```bash
npm start
```

This will start the server on the port specified in the .env file (default: 8080).

The application will be available at:
```bash
http://localhost:8080
```

### Running Tests

This project includes **Jest** and **Supertest** for testing API endpoints.

## To run the tests:

1. Run the tests:

    ```bash
    npm test
    ```
