import { ComponentRegistry } from './ComponentRegistry';

export interface ControllerOptions {
  name?: string;
  dependencies?: string[];
}

export function JarvisController(
  options: ControllerOptions = {}
): ClassDecorator {
  return function (target: any) {
    const name = options.name || target.name;

    ComponentRegistry.register({
      name,
      type: 'controller',
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
