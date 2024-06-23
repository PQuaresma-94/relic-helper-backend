# Relic Helper Backend

## Overview

Relic Helper Backend is the server-side component of the Relic Helper platform, responsible for connecting to third-party APIs, managing user authentication, and handling custom team management. This backend service provides a robust and secure way to interact with the data and business logic of the Relic Helper platform.

## Features

- **Third-party API Integration**: Connects to a third-party API to retrieve all characters and legendary characters along with their required units for upgrades.
- **User Management**: Allows the creation of users and secure login functionality.
- **Custom Team Management**: Enables users to create and delete custom teams.

## Installation

To get started with the Relic Helper Backend, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd relic-helper-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**: Create a `.env` file in the root directory and add the following variables:

   ```
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

## API Endpoints

### User Management

- **Create User**: `POST /signup`
- **Login**: `POST /signin`
- **Get User Information**: `Get /users/me`
- **Update User Information**: `PATCH /users/me`

### Character Management

- **Get All Characters**: `GET /characters/all`
- **Get All Legendary Characters**: `GET /characters/legendary`
- **Get Legendary Character by ID**: `GET /characters/legendary/:baseId`

### Custom Team Management

- **Get All Custom Teams**: `GET /custom-teams/`
- **Get Custom Team by ID**: `GET /custom-teams//:teamId`
- **Create Custom Team**: `POST /custom-teams/`
- **Delete Custom Team**: `DELETE /custom-teams/:teamId`

## Usage

To use the backend services, you can send HTTP requests to the appropriate endpoints. Here are some examples using `curl`:

- **Create User**:

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name": "user1",
   "email": "user1@mail.com", "avatar": "Valid URL link", "password": "pass123"}' http://localhost:3001/signup
  ```

- **Login**:

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"email": "user1@mail.com", "password": "pass123"}' http://localhost:3001/signin
  ```

- **Get All Characters**:

  ```bash
  curl -X GET http://localhost:3001/characters/all
  ```

- **Get Legendary Characters**:

  ```bash
  curl -X GET http://localhost:3001/characters/legendary
  ```

- **Get Legendary Character by ID**:

  ```bash
  curl -X GET http://localhost:3001/characters/legendary/TBD_KYLO
  ```

Note: User must be authorized to get custom teams

- **Get All Custom Teams**:
  ```bash
  curl -X GET http://localhost:3001/custom-teams/
  ```
- **Create Custom Team**:
  ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
    "name": "Custom Team Test 1",
    "image": "https://game-assets.swgoh.gg/tex.jg_charui_galacticlegend_kylo.png",
    "requiredUnits": [
      {
        "baseId": "TRIPLEZERO",
        "gearLevel": 13,
        "relicTier": 3
      },
      {
        "baseId": "FIRSTORDEROFFICERMALE",
        "gearLevel": 13,
        "relicTier": 7
      },
      {
        "baseId": "PRINCESSKNEESAA",
        "gearLevel": 13,
        "relicTier": 9
      }
    ]
  }' http://localhost:3001/custom-teams/
  ```
