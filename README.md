# FixCar - Service Management System

## Overview

FixCar is a web application for managing car service orders. The system allows users to add, view, and update service requests for vehicles. It uses React for the frontend and PHP with MySQL for the backend, running on XAMPP.

## Features

- Add new service orders
- View existing orders
- Update order status
- Manage vehicle and client data

## Technologies Used

- **Frontend:** React, TypeScript
- **Backend:** PHP (REST API)
- **Database:** MySQL
- **Server:** XAMPP (Apache, MySQL, PHP)

## Installation

### Prerequisites

- XAMPP installed on your local machine
- Node.js and npm installed

### Backend Setup

1. Start XAMPP and enable **Apache** and **MySQL**.
2. Import the `FixCar.sql` database schema into MySQL (via phpMyAdmin or CLI).
3. Place the PHP files in the `htdocs` directory (e.g., `C:\xampp\htdocs\fixcar`).
4. Ensure `add_order.php` is accessible at `http://localhost/fixcar/add_order.php`.

### Frontend Setup

1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/fixcar.git
   cd fixcar
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React application:
   ```sh
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

## API Endpoints

### Add Order

**Endpoint:** `POST http://localhost/fixcar/add_order.php`

**Request Body:**

```json
{
  "pojazd_id": "1",
  "pracownik_id": "2",
  "opis_problemu": "Engine noise issue"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Order added successfully"
}
```

## Contributing

If you'd like to contribute, please fork the repository and submit a pull request with your improvements.

## License

This project is open-source and available under the [MIT License](LICENSE).
