# Simple Authentication System

A basic authentication system built with **Node.js**, **Express**, **MongoDB**, and **JWT**.  
It uses HTTP‑only cookies to store tokens securely and provides signup, login, logout, and a protected dashboard route.

## Features

- User signup with password hashing (bcrypt)
- User login with JWT issuance (stored in HTTP‑only cookie)
- Protected route (`/dashboard`) accessible only with valid token
- Logout (clears the cookie)
- Token expiration (1 hour by default)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud, e.g., MongoDB Atlas)
- A tool to test APIs (e.g., [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or `curl`)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/simple-auth.git
   cd simple-auth

  2. Installation of dependency
     npm install
