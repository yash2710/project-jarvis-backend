import { AppError } from '../base/AppError';

/**
 * Error thrown when input validation fails
 */
export class ValidationError extends AppError {
  constructor(message: string, field?: string, value?: unknown) {
    super(
      'ValidationError',
      400,
      message,
      { field, value }
    );
  }
}

/**
 * Error thrown when required fields are missing
 */
export class MissingRequiredFieldError extends AppError {
  constructor(fieldName: string) {
    super(
      'MissingRequiredFieldError',
      400,
      `Required field '${fieldName}' is missing`,
      { field: fieldName }
    );
  }
}
