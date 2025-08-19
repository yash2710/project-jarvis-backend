export interface ControllerOptions {
  name?: string;
  dependencies?: string[];
}

// Global controller registry for TSOA integration
const controllerRegistry = new Map<any, string>();
const controllerTokenMap = new Map<string, string>();

export function JarvisController(
  options: ControllerOptions = {}
): ClassDecorator {
  return function (target: any) {
    const name = options.name || target.name;

    // Register for TSOA dynamic resolution
    controllerRegistry.set(target, name);
    
    // Create dynamic mapping to DI tokens based on naming convention
    // Controller name -> DI Token (e.g., "HelloController" -> "HelloController")
    controllerTokenMap.set(name, name);

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

export function getControllerToken(controller: any): string | undefined {
  const controllerName = controllerRegistry.get(controller);
  return controllerName ? controllerTokenMap.get(controllerName) : undefined;
}

export function getAllControllerTokens(): Map<string, string> {
  return new Map(controllerTokenMap);
}
