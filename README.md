# Project Jarvis Backend

A TypeScript-based Node.js backend API built with Express, TSOA, MongoDB, and Swagger documentation.

## Features

- 🚀 **TypeScript** - Full TypeScript support with strict typing
- 📝 **TSOA** - TypeScript OpenAPI (Swagger) decorators for automatic API documentation
- 🍃 **MongoDB** - Database integration with Mongoose ODM
- 📚 **Swagger UI** - Interactive API documentation
- 🧪 **Testing** - Comprehensive test suite with Mocha and Chai
- 🔒 **Security** - Helmet and CORS middleware for security
- 🔄 **Development** - Hot reloading with Nodemon and automatic Swagger generation

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (running locally or connection string)

## Getting Started

### 1. Clone and Setup

```bash
git clone https://github.com/yash2710/project-jarvis-backend.git
cd project-jarvis-backend
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/project-jarvis
PORT=3000
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If using MongoDB locally
mongod

# Or if using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Build and Run

```bash
# Development mode (with hot reloading)
npm run dev

# Production build
npm run build:all
npm start
```

## API Endpoints

### Hello API

- **GET** `/api/hello` - Get a hello message from the database
- **POST** `/api/hello` - Create a new hello message

#### Example Usage

```bash
# Get hello message
curl http://localhost:3000/api/hello

# Create new hello message
curl -X POST http://localhost:3000/api/hello \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from API!", "userId": "user123"}'
```

### Health Check

- **GET** `/health` - Application health status

## API Documentation

Once the server is running, you can access the interactive Swagger documentation at:

- **Swagger UI**: http://localhost:3000/api-docs

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

The tests include:
- Unit tests for controllers
- Database integration tests
- API endpoint validation
- Error handling scenarios

## Development Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm run build:swagger # Generate Swagger specification and routes
npm run build:all    # Build both TypeScript and Swagger
npm start           # Start production server
npm test            # Run test suite
npm run clean       # Clean build directory
```

## Project Structure

```
project-jarvis-backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection configuration
│   ├── controllers/
│   │   └── HelloController.ts   # API controllers with TSOA decorators
│   ├── models/
│   │   └── HelloMessage.ts      # Mongoose models
│   ├── routes/                  # Generated TSOA routes (auto-generated)
│   ├── swagger/                 # Generated Swagger docs (auto-generated)
│   ├── middleware/
│   │   └── middleware.template  # TSOA middleware template
│   └── app.ts                   # Main application entry point
├── tests/
│   └── hello.test.ts           # Test files
├── dist/                       # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json              # TypeScript configuration
├── tsoa.json                  # TSOA configuration
├── .env.example               # Environment variables example
├── .gitignore
└── README.md
```

## Technologies Used

- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **TSOA** - OpenAPI/Swagger decorators and route generation
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Swagger UI Express** - Interactive API documentation
- **Mocha & Chai** - Testing framework
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development hot reloading

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/project-jarvis` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the `MONGODB_URI` in your `.env` file
   - Verify network connectivity

2. **Port Already in Use**
   - Change the `PORT` in your `.env` file
   - Kill the process using the port: `lsof -ti:3000 | xargs kill -9`

3. **TypeScript Compilation Errors**
   - Run `npm run clean` and then `npm run build:all`
   - Check for missing type definitions

4. **Swagger Documentation Not Loading**
   - Run `npm run build:swagger` to generate the documentation
   - Ensure the swagger files are created in `src/swagger/`

For more help, please open an issue in the repository.
