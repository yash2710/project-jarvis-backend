export interface ClientOptions {
  name?: string;
  dependencies?: string[];
}

export function Client(options: ClientOptions = {}): ClassDecorator {
  return function (target: any) {
    const name = options.name || target.name;

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
