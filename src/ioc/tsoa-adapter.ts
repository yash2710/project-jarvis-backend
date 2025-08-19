import { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import { DIRegistry } from './registry';
import { getControllerToken } from '../decorators/Controller';

/**
 * Fully dynamic TSOA IoC Container adapter
 */
class ProjectIocContainer implements IocContainer {
  get<T>(controller: any): T { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Get the controller token from the decorator registry
    const token = getControllerToken(controller);
    
    if (!token) {
      throw new Error(`Controller ${controller.name} not registered with @JarvisController decorator`);
    }

    // Resolve directly using the token from the decorator
    return DIRegistry.resolve<T>(token);
  }
}

/**
 * IoC Container factory for TSOA
 */
export const iocContainer: IocContainerFactory = () => {
  return new ProjectIocContainer();
};
