📋 Overview
This is a professional NestJS backend setup with MySQL database integration and Cloudinary for image management. The application follows a modular structure with proper separation of concerns.

🚀 Quick Start
Prerequisites
Node.js (v16 or later)

npm or yarn

MySQL database

Cloudinary account (for image storage)

Installation
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

⚙️ Environment Configuration
Create a .env file in the root directory with the following variables:
# Server Configuration
SERVER_PORT=3000

# Database Configuration (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

🏗️ Project Structure
src/
├── main.ts          # Application entry point
├── app.module.ts    # Root application module
├── config/          # Environment configurations
├── pokemon/         # Pokemon feature module
│   ├── entities/    # Database entities
│   ├── dto/         # Data Transfer Objects
│   ├── controllers/ # API controllers
│   └── services/    # Business logic       
└── cloudinary/      # Cloudinary image module

🛠️ Development Commands
# Run in development mode
npm run start:dev

# Build for production
npm run build

# Run in production mode
npm run start:prod

🧪 Testing
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:cov

📦 Dependencies
The project uses the following key dependencies:

@nestjs/core: NestJS framework core

@nestjs/typeorm: TypeORM integration for NestJS

mysql2: MySQL database driver

typeorm: ORM for database operations

@nestjs/config: Configuration module for environment variables

cloudinary: Cloudinary SDK for image management

📚 Resources
NestJS Documentation

TypeORM Documentation

Cloudinary Documentation

NestJS Deployment Guide

## 👤 **Author**  
- **[Fernando Montoya](https://github.com/fermont30)** - _Desarrollo y mantenimiento_  
