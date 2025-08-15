// Import all components to register them with decorators
import './controllers/HelloController';
import './services/HelloService';
import './clients/DatabaseClient';

import { ComponentRegistry } from './decorators/ComponentRegistry';

export async function bootstrap(): Promise<void> {
  // Initialize all registered components
  await ComponentRegistry.initializeAll();
}
