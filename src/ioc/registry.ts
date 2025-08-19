import { container } from 'tsyringe';
import 'reflect-metadata';
import { registrations } from './registrations';

/**
 * Simple dependency injection registry
 */
export class DIRegistry {
  /**
   * Register all components with the container as singletons
   */
  static register(): void {
    registrations.forEach(({ token, implementation }) => {
      container.registerSingleton(token, implementation);
    });
  }

  /**
   * Resolve instance from container
   */
  static resolve<T>(token: string): T {
    return container.resolve<T>(token);
  }

  /**
   * Clear all registrations (useful for testing)
   */
  static clear(): void {
    container.clearInstances();
  }
}
