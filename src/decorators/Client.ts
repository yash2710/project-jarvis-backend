import { ComponentRegistry } from './ComponentRegistry';

export interface ClientOptions {
  name?: string;
  dependencies?: string[];
}

export function Client(options: ClientOptions = {}): ClassDecorator {
  return function (target: any) {
    const name = options.name || target.name;

    ComponentRegistry.register({
      name,
      type: 'client',
      target,
      dependencies: options.dependencies || [],
      initialized: false,
    });

    // Add a static method to get dependencies
    target.getDependencies = function (): string[] {
      return options.dependencies || [];
    };

    // Add a static method to get the component name
    target.getComponentName = function (): string {
      return name;
    };

    return target;
  };
}
