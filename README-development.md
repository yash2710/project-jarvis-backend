# Development Setup Guide

This project includes Docker-based MongoDB setup for local development.

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- Git

## Development Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd project-jarvis-backend
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure it for development:

```bash
cp .env.example .env
```

The `.env` file is already configured for development with Docker MongoDB:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:admin123@localhost:27017/project-jarvis?authSource=admin
```

### 3. Start MongoDB with Docker

Start the MongoDB container:

```bash
npm run dev:setup
```

This command will:
- Pull the MongoDB 7.0 Docker image
- Start a MongoDB container with authentication
- Create a persistent volume for data storage
- Expose MongoDB on port 27017

### 4. Start Development Server

```bash
npm run dev
```

This will:
- Automatically start MongoDB (via predev script)
- Start the TypeScript compiler in watch mode
- Start nodemon for hot reloading
- Generate Swagger documentation

## Available Scripts

### Development Scripts
- `npm run dev` - Start development server (automatically sets up MongoDB)
- `npm run dev:setup` - Start MongoDB Docker container
- `npm run dev:teardown` - Stop and remove MongoDB container
- `npm run dev:reset` - Reset MongoDB (removes all data and restarts)
- `npm run dev:logs` - View MongoDB container logs

### Build Scripts
- `npm run build` - Compile TypeScript
- `npm run build:swagger` - Generate Swagger spec and routes
- `npm run build:all` - Build everything

### Test Scripts
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## MongoDB Configuration

### Development Environment
- **Host**: localhost
- **Port**: 27017
- **Database**: project-jarvis
- **Admin User**: admin
- **Admin Password**: admin123
- **Connection String**: `mongodb://admin:admin123@localhost:27017/project-jarvis?authSource=admin`

### Production Environment
Set the `MONGODB_URI` environment variable to your production MongoDB connection string.

## Database Schema

The application uses Mongoose for MongoDB object modeling. Database models are defined in the `src/models/` directory.

## Troubleshooting

### MongoDB Connection Issues

1. **Check if MongoDB container is running:**
   ```bash
   docker ps
   ```

2. **View MongoDB logs:**
   ```bash
   npm run dev:logs
   ```

3. **Reset MongoDB completely:**
   ```bash
   npm run dev:reset
   ```

4. **Manually start MongoDB:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

### Port Conflicts

If port 27017 is already in use, you can:
1. Stop other MongoDB instances
2. Or modify the port in `docker-compose.dev.yml`

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Set `MONGODB_URI` to your production MongoDB connection string
3. The application will not try to start Docker containers in production mode
4. Use `npm run build:all` and `npm start` for production builds

## Adding Sample Data

To add sample data for development:

1. Connect to your production/staging database
2. Export collections using `mongodump`:
   ```bash
   mongodump --uri="mongodb://your-production-uri" --out=dumps/
   ```
3. The dumps will be automatically loaded when the container starts

## File Structure

```
project-jarvis-backend/
├── docker-compose.dev.yml    # Docker Compose for development
├── .env                     # Development environment variables
├── .env.example            # Environment template
├── src/
│   ├── config/
│   │   └── database.ts     # Database configuration
│   └── ...
└── dumps/                  # MongoDB dump files (optional)
