/**
 * Dependency injection constants
 * All dependency identifiers are stored here as string constants
 * Use these constants across the source for usage, reference, and registration
 */

// Client constants
export const CLIENTS = {
  DATABASE_CLIENT: 'DatabaseClient',
} as const;

// Service constants
export const SERVICES = {
  HELLO_SERVICE: 'HelloService',
} as const;

// Controller constants
export const CONTROLLERS = {
  HELLO_CONTROLLER: 'HelloController',
} as const;

// Type definitions for dependency identifiers
export type ClientKey = typeof CLIENTS[keyof typeof CLIENTS];
export type ServiceKey = typeof SERVICES[keyof typeof SERVICES];
export type ControllerKey = typeof CONTROLLERS[keyof typeof CONTROLLERS];
