/**
 * Base error class for all application errors.
 * All custom errors should extend this class to ensure consistent error handling.
 */
export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly context?: Record<string, unknown>;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: number,
    message: string,
    context?: Record<string, unknown>,
    isOperational = true
  ) {
    super(message);
    
    this.name = name;
    this.httpCode = httpCode;
    this.context = context;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Set the prototype explicitly to maintain instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Converts the error to a JSON object for logging or API responses
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      httpCode: this.httpCode,
      context: this.context,
      isOperational: this.isOperational,
      stack: this.stack,
    };
  }

  /**
   * Gets a sanitized version of the error suitable for client responses
   * (excludes sensitive information like stack traces)
   */
  toClientResponse(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      httpCode: this.httpCode,
      context: this.context,
    };
  }
}
