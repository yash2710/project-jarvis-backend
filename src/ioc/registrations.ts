// Constants
import { CLIENTS, SERVICES, CONTROLLERS } from './constants';

// Client imports
import * as Clients from '../clients';

// Service imports
import * as Services from '../services';

// Controller imports
import * as Controllers from '../controllers';

/**
 * Registration entry structure
 */
export interface RegistrationEntry {
  token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  implementation: new (...args: any[]) => any;
}

/**
 * All component registrations
 */
export const registrations: RegistrationEntry[] = [
  // Client registrations
  { token: CLIENTS.DATABASE_CLIENT, implementation: Clients.DatabaseClient },

  // Service registrations  
  { token: SERVICES.HELLO_SERVICE, implementation: Services.HelloService },
  { token: SERVICES.PROJECT_SERVICE, implementation: Services.ProjectService },

  // Controller registrations
  { token: CONTROLLERS.HELLO_CONTROLLER, implementation: Controllers.HelloController },
  { token: CONTROLLERS.PROJECT_CONTROLLER, implementation: Controllers.ProjectsController },
];
