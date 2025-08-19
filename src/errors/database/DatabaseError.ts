import { AppError } from '../base/AppError';

/**
 * Base error for database-related issues
 */
export class DatabaseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(
      'DatabaseError',
      500,
      message,
      context
    );
  }
}
