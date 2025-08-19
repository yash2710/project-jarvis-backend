// Base Error
export { AppError } from './base/AppError';

// Validation Errors
export {
  ValidationError,
  MissingRequiredFieldError,
} from './validation/ValidationError';

// Database Errors
export {
  DatabaseError,
} from './database/DatabaseError';

// Dependency Injection Errors
export {
  DependencyNotFoundError,
} from './dependency/DependencyError';

// Error Helper Functions
import { AppError } from './base/AppError';

export class ErrorFactory {
  /**
   * Checks if an error is operational (expected) or programming error
   */
  static isOperationalError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}
