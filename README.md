# 🚗 Car Workshop Management System

A comprehensive web application for managing automotive repair shop operations, from customer and vehicle tracking to service orders and inventory.

## ✨ Features

### Dashboard

- **Real-time stats**: Today's orders, revenue, and urgent tasks
- **Priority-based view**:
  - Upcoming deadlines (due in ≤2 days)
  - New orders (received today)
  - Overdue services
- Visual charts for monthly performance

### Core Modules

| Module    | Key Functions                       |
| --------- | ----------------------------------- |
| Customers | Client database, vehicle history    |
| Orders    | Service tracking, status workflow   |
| Vehicles  | VIN lookup, maintenance schedules   |
| Services  | Price lists, service templates      |
| Inventory | Parts stock alerts, supplier orders |
| Employees | Work schedules, role-based access   |

## 🛠️ Tech Stack

- **Backend**: PHP 8.2 + Laravel 10 (or Node.js/Express alternative)
- **Frontend**: Vue.js 3 + Tailwind CSS
- **Database**: MySQL (with schema provided in `/database`)
- **Integrations**:
  - VIN decoding API
  - SMS/email notifications (Twilio, Mailgun)

## 📊 Database Schema

![DB Schema](docs/schema.png)  
_(Simplified diagram - see full schema in `docs/`)_

## 🚀 Installation

```bash
# Clone repo
git clone https://github.com/yourrepo/workshop-system.git

# Install dependencies
composer install
npm install

# Configure
cp .env.example .env

# Run migrations
php artisan migrate --seed
```
