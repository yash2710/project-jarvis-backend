import { AppError } from '../base/AppError';

export class NotFoundError extends AppError {
  constructor(type: string, message: string, field?: string, value?: unknown) {
    super(
      `${type}NotFoundError`,
      404,
      message,
      { field, value }
    );
  }
}