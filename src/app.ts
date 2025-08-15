import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import { Database } from './config/database';
import { RegisterRoutes } from './routes/routes';
import { bootstrap } from './bootstrap';
import { ComponentRegistry } from './decorators/ComponentRegistry';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Create API router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Swagger documentation setup
try {
  const swaggerDocument = require('../dist/swagger/swagger.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('📚 Swagger documentation available at /api-docs');
} catch {
  console.warn('⚠️ Swagger documentation not available. Run "npm run build:swagger" to generate it.');
}

// Error handling middleware
app.use((err: Error, _req: Request, res: Response) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Start server
async function startServer(): Promise<void> {
  try {
    // Bootstrap all components
    await bootstrap();
    
    // Connect to MongoDB using our DatabaseClient
    const databaseClient = ComponentRegistry.getInstance<{ connect: () => Promise<void> }>('DatabaseClient');
    if (databaseClient && typeof databaseClient.connect === 'function') {
      await databaseClient.connect();
    } else {
      // Fallback to original Database connection
      await Database.connect();
    }
    
    // Register TSOA routes under /api
    RegisterRoutes(apiRouter);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API documentation: http://localhost:${PORT}/api-docs`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await Database.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await Database.disconnect();
  process.exit(0);
});

startServer();

export default app;
