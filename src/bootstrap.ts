import { DIRegistry } from './ioc';

export async function bootstrap(): Promise<void> {
  // Register all components as singletons
  DIRegistry.register();
}
