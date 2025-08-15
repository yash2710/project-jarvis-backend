export interface ComponentMetadata {
  name: string;
  type: 'controller' | 'service' | 'client';
  target: any;
  instance?: any;
  dependencies?: string[];
  initialized?: boolean;
}

export class ComponentRegistry {
  private static components: Map<string, ComponentMetadata> = new Map();
  private static instances: Map<string, any> = new Map();

  static register(metadata: ComponentMetadata): void {
    this.components.set(metadata.name, metadata);
  }

  static get(name: string): ComponentMetadata | undefined {
    return this.components.get(name);
  }

  static getInstance<T>(name: string): T | undefined {
    return this.instances.get(name) as T;
  }

  static setInstance(name: string, instance: any): void {
    this.instances.set(name, instance);
    const component = this.components.get(name);
    if (component) {
      component.instance = instance;
      component.initialized = true;
    }
  }

  static getAllComponents(): ComponentMetadata[] {
    return Array.from(this.components.values());
  }

  static getComponentsByType(
    type: 'controller' | 'service' | 'client'
  ): ComponentMetadata[] {
    return this.getAllComponents().filter(
      (component) => component.type === type
    );
  }

  static async initializeAll(): Promise<void> {
    // Initialize clients first (no dependencies usually)
    await this.initializeComponentsByType('client');

    // Then services (may depend on clients)
    await this.initializeComponentsByType('service');

    // Finally controllers (may depend on services and clients)
    await this.initializeComponentsByType('controller');
  }

  private static async initializeComponentsByType(
    type: 'controller' | 'service' | 'client'
  ): Promise<void> {
    const components = this.getComponentsByType(type);

    for (const component of components) {
      if (!component.initialized) {
        await this.initializeComponent(component);
      }
    }
  }

  private static async initializeComponent(
    component: ComponentMetadata
  ): Promise<void> {
    try {
      // Check if dependencies are resolved
      if (component.dependencies) {
        for (const dep of component.dependencies) {
          const depComponent = this.components.get(dep);
          if (!depComponent || !depComponent.initialized) {
            throw new Error(
              `Dependency ${dep} not found or not initialized for ${component.name}`
            );
          }
        }
      }

      // Create instance if not already created
      if (!component.instance) {
        const instance = new component.target();
        this.setInstance(component.name, instance);
      }
    } catch (error) {
      console.error(
        `❌ Failed to initialize ${component.type} ${component.name}:`,
        error
      );
      throw error;
    }
  }

  static clear(): void {
    this.components.clear();
    this.instances.clear();
  }
}
