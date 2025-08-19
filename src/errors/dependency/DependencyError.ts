import { AppError } from '../base/AppError';

/**
 * Error thrown when a required dependency is not found
 */
export class DependencyNotFoundError extends AppError {
  constructor(dependencyName: string, componentName: string) {
    super(
      'DependencyNotFoundError',
      500,
      `Dependency '${dependencyName}' not found or not initialized for component '${componentName}'`,
      { dependencyName, componentName }
    );
  }
}
