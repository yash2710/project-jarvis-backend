# Cline Instructions for Project Jarvis Backend

## ⚠️ CRITICAL: Auto-Generated Files

### Routes File (`src/routes/routes.ts`)
**DO NOT MANUALLY EDIT** `src/routes/routes.ts` - This file is **automatically generated** by TSOA.

- This file is generated from TypeScript controllers using TSOA annotations
- Manual changes will be **overwritten** when TSOA regenerates the file
- Always regenerate this file using the provided npm scripts after controller changes

## TSOA Route Generation

### How It Works
1. TSOA scans controllers in `src/controllers/**/*Controller.ts`
2. Uses TypeScript decorators (`@Route`, `@Get`, `@Post`, etc.) to generate routes
3. Automatically creates route handlers, validation, and type checking
4. Generates both routes file and OpenAPI/Swagger specification

### When Routes Are Generated
Routes are automatically generated when:
- Running `npm run build:swagger`
- Running `npm run dev` (includes watch mode)
- Running `npm run build:all`
- Running `npm run prebuild` (before build)
- Running `npm run prestart` (before start)

### Manual Generation Commands
```bash
# Generate routes and swagger spec
npm run build:swagger

# Generate with watch mode (auto-regenerates on controller changes)
npm run build:swagger -- --watch

# Full build (includes route generation)
npm run build:all
```

## Working with Controllers

### Adding New Routes
1. **Create/modify controllers** in `src/controllers/`
2. **Use TSOA decorators** for route definitions:
   ```typescript
   @Route("users")
   export class UserController extends Controller {
     @Get("/")
     public async getUsers(): Promise<User[]> {
       // implementation
     }
     
     @Post("/")
     public async createUser(@Body() user: CreateUserRequest): Promise<User> {
       // implementation
     }
   }
   ```
3. **Run route generation**: `npm run build:swagger`
4. **Never edit** `src/routes/routes.ts` directly

### Configuration Files
- **`tsoa.json`**: TSOA configuration
  - `controllerPathGlobs`: Defines where controllers are located
  - `routes.routesDir`: Where routes file is generated (`src/routes`)
  - `spec.outputDirectory`: Where OpenAPI spec is generated (`dist/swagger`)

### Development Workflow
```bash
# Start development server (includes auto-route generation)
npm run dev

# This runs:
# 1. tsoa spec-and-routes --watch (auto-regenerates on changes)
# 2. nodemon src/app.ts (restarts server on changes)
```

## File Structure Guidelines

### Controllers (`src/controllers/`)
- **DO EDIT**: Controller files with TSOA decorators
- Controllers define API endpoints and business logic
- Use TypeScript decorators for route configuration

### Models (`src/models/`)
- **DO EDIT**: Mongoose models, schemas, and database interfaces
- Define database models using mongoose
- Contains database-related interfaces that extend Document

### Types (`src/types/`)
- **DO EDIT**: TSOA API types and interfaces
- Define request/response models for API endpoints
- TSOA uses these for validation and OpenAPI generation
- Contains API contracts separate from database models

### Routes (`src/routes/`)
- **DO NOT EDIT**: `routes.ts` is auto-generated
- **DO EDIT**: Other route-related files (if any)

### Generated Files
- `src/routes/routes.ts` - Auto-generated route handlers
- `dist/swagger/swagger.json` - Auto-generated OpenAPI spec

## ⚠️ CRITICAL: Middleware Templates

### DO NOT CREATE Custom Middleware Templates
**NEVER create** `src/middleware/middleware.template` or custom middleware templates.

- Custom middleware templates are **error-prone** and **difficult to maintain**
- They can cause **corrupted route generation** with embedded environment data
- TSOA's **default template is well-tested** and handles all standard use cases
- Custom templates require deep knowledge of TSOA internals and Handlebars

### Why Custom Templates Fail
1. **Complex template syntax** - Requires precise Handlebars knowledge
2. **Missing imports** - Easy to forget critical TSOA runtime dependencies
3. **Validation service issues** - Constructor parameters and method signatures change between versions
4. **Environment data pollution** - Incorrect JSON serialization can dump system data into generated files

### Recommended Approach
- **Use TSOA's default template** by omitting `middlewareTemplate` from `tsoa.json`
- **Customize behavior** through controller decorators and TSOA configuration options
- **Extend functionality** through custom middleware in your Express app setup

### Current Configuration
The project is configured to use TSOA's default template:
```json
{
  "routes": {
    "routesDir": "src/routes"
    // No middlewareTemplate specified = uses default
  }
}
```

## Important Notes for Cline

1. **Never manually modify** `src/routes/routes.ts`
2. **Never create** custom middleware templates (`src/middleware/middleware.template`)
3. **Always run** `npm run build:swagger` after changing controllers
4. **Use TSOA decorators** in controllers for route definitions
5. **Check generated files** into version control (they're not in .gitignore)
6. **Development server** automatically handles route regeneration
7. **Building/starting** the app automatically regenerates routes

## Common Tasks

### Adding a New API Endpoint
1. Create/modify controller in `src/controllers/`
2. Add TSOA decorators (`@Get`, `@Post`, etc.)
3. Define request/response types in `src/types/`
4. Define database models (if needed) in `src/models/`
5. Run `npm run build:swagger` to regenerate routes
6. Test the endpoint

### Debugging Route Issues
1. Check controller decorators and syntax
2. Verify model types are properly defined
3. Run `npm run build:swagger` to see generation errors
4. Check generated `routes.ts` for expected route handlers
5. Review `dist/swagger/swagger.json` for API specification

### Project Commands Reference
```bash
npm run build:swagger    # Generate routes and swagger spec
npm run dev             # Development with auto-regeneration
npm run build:all       # Full build (TypeScript + routes)
npm run start           # Start production server
npm run test            # Run tests
```

## TSOA Decorator Examples

```typescript
import { Controller, Route, Get, Post, Put, Delete, Body, Path, Query, Header } from "tsoa";

@Route("api/users")
export class UserController extends Controller {
  
  @Get("/")
  public async getUsers(@Query() limit?: number): Promise<User[]> {
    // GET /api/users?limit=10
  }
  
  @Get("/{id}")
  public async getUser(@Path() id: string): Promise<User> {
    // GET /api/users/123
  }
  
  @Post("/")
  public async createUser(@Body() user: CreateUserRequest): Promise<User> {
    // POST /api/users
  }
  
  @Put("/{id}")
  public async updateUser(@Path() id: string, @Body() user: UpdateUserRequest): Promise<User> {
    // PUT /api/users/123
  }
  
  @Delete("/{id}")
  public async deleteUser(@Path() id: string): Promise<void> {
    this.setStatus(204);
    // DELETE /api/users/123
  }
}
```

Remember: The power of TSOA is in the automatic generation - let it handle the routing, validation, and documentation for you!

## ⚠️ CRITICAL: Import Guidelines

### High-Level Directory Imports
**ALWAYS import from directory index files, NOT individual class files.**

#### Correct Import Patterns
```typescript
// ✅ CORRECT: Import from directory level
import * as Clients from '../clients';
import * as Services from '../services';
import * as Controllers from '../controllers';
import { SomeService } from '../services';
import { SomeClient } from '../clients';

// Usage
const dbClient = new Clients.DatabaseClient();
const helloService = new Services.HelloService();
```

#### Incorrect Import Patterns
```typescript
// ❌ WRONG: Direct file imports
import { DatabaseClient } from '../clients/DatabaseClient';
import { HelloService } from '../services/HelloService';
import { HelloController } from '../controllers/HelloController';
```

### Why Use High-Level Imports
1. **Centralized exports** - All exports are managed through index files
2. **Cleaner imports** - Fewer import lines and better organization
3. **Easier refactoring** - Move files without breaking imports
4. **Consistent structure** - All directories follow the same pattern
5. **Better dependency management** - Clear separation of concerns

### Directory Structure Requirements
Each component directory MUST have an `index.ts` file that exports all components:

```
src/
├── clients/
│   ├── index.ts          # exports all clients
│   ├── DatabaseClient.ts
│   └── ...
├── services/
│   ├── index.ts          # exports all services
│   ├── HelloService.ts
│   └── ...
├── controllers/
│   ├── index.ts          # exports all controllers
│   ├── HelloController.ts
│   └── ...
```

### Index File Pattern
Each `index.ts` should follow this pattern:
```typescript
// src/clients/index.ts
export { DatabaseClient } from './DatabaseClient';
export { AnotherClient } from './AnotherClient';

// src/services/index.ts
export { HelloService } from './HelloService';
export { AnotherService } from './AnotherService';
```

### Important Notes for Cline
1. **ALWAYS check for index.ts** in directories before importing
2. **Create index.ts files** if they don't exist when adding new components
3. **Update index.ts files** when adding new classes to directories
4. **Use directory-level imports** in all new code
5. **Refactor direct file imports** to use directory imports when encountered

## ⚠️ CRITICAL: Environment Variable Management

### Environment Variable Files
This project uses **two critical environment files** that must be maintained in sync:

- **`.env`** - Actual environment values for development (contains sensitive data)
- **`.env.example`** - Template with example/placeholder values (safe for version control)

### MANDATORY: Dual File Updates
When adding or modifying environment variables, you **MUST update BOTH files**:

1. **`.env`** - Add actual values for development/testing
2. **`.env.example`** - Add placeholder/example values with comments

### Environment Variable Extraction Rules

#### When to Extract Environment Variables
Extract hardcoded values to environment variables when they are:

- **Configuration values** (ports, URLs, timeouts, limits)
- **Sensitive data** (API keys, secrets, passwords, tokens)
- **Environment-specific** (database URLs, service endpoints)
- **Feature flags** (enable/disable features)
- **External service configurations** (third-party API endpoints)

#### When NOT to Extract
Don't extract values that are:

- **Application constants** (static text, error messages)
- **Internal logic values** (algorithm parameters, fixed calculations)
- **Development-only values** (test data, mock responses)

### Environment Variable Naming Convention

Follow this strict naming pattern:
```bash
# Database configuration
MONGODB_URI=mongodb://localhost:27017/project-jarvis
DB_HOST=localhost
DB_PORT=27017
DB_NAME=project-jarvis

# Server configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# External services (use service name prefix)
REDIS_URL=redis://localhost:6379
ELASTICSEARCH_URL=http://localhost:9200

# API keys and secrets (use descriptive names)
JWT_SECRET=your-super-secret-jwt-key
API_KEY_OPENAI=your-openai-api-key
WEBHOOK_SECRET=your-webhook-secret

# Feature flags (use ENABLE_ or FEATURE_ prefix)
ENABLE_LOGGING=true
FEATURE_AUTHENTICATION=true
DEBUG_MODE=false
```

### Code Integration Requirements

#### Environment Variable Access Patterns

**Default Values Decision Matrix:**

1. **Non-critical configuration** - Provide sensible defaults:
   ```typescript
   // ✅ CORRECT: Optional configuration with reasonable defaults
   const PORT = parseInt(process.env.PORT || '3000', 10);
   const DEBUG_MODE = process.env.DEBUG_MODE === 'true'; // defaults to false
   const REQUEST_TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT || '5000', 10);
   ```

2. **Critical/Required configuration** - No defaults, fail fast:
   ```typescript
   // ✅ CORRECT: Required values should throw if missing
   const MONGODB_URI = process.env.MONGODB_URI;
   if (!MONGODB_URI) {
     throw new Error('MONGODB_URI environment variable is required');
   }
   
   const JWT_SECRET = process.env.JWT_SECRET;
   if (!JWT_SECRET) {
     throw new Error('JWT_SECRET environment variable is required');
   }
   ```

3. **Environment-dependent required values** - Conditional validation:
   ```typescript
   // ✅ CORRECT: Required in production, optional in development
   const API_KEY = process.env.API_KEY;
   if (process.env.NODE_ENV === 'production' && !API_KEY) {
     throw new Error('API_KEY is required in production environment');
   }
   ```

#### Anti-Patterns to Avoid

```typescript
// ❌ WRONG: Direct process.env access without validation
const port = process.env.PORT;

// ❌ WRONG: Providing defaults for sensitive/critical values
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/fallback';
const jwtSecret = process.env.JWT_SECRET || 'default-secret'; // SECURITY RISK!

// ❌ WRONG: Silent fallbacks for required configuration
const apiKey = process.env.CRITICAL_API_KEY || ''; // Should fail instead
```

#### Configuration File Pattern
For complex configurations, create dedicated config files with proper validation:

```typescript
// src/config/environment.ts
import * as dotenv from 'dotenv';
dotenv.config();

// Helper function for required env vars
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
}

// Helper function for optional env vars with defaults
function optionalEnv(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

export const config = {
  server: {
    port: parseInt(optionalEnv('PORT', '3000'), 10),
    host: optionalEnv('HOST', 'localhost'),
    nodeEnv: optionalEnv('NODE_ENV', 'development'),
  },
  database: {
    uri: requireEnv('MONGODB_URI'), // Required - no default
    options: {
      retryWrites: process.env.DB_RETRY_WRITES === 'true',
      maxPoolSize: parseInt(optionalEnv('DB_MAX_POOL_SIZE', '10'), 10),
    }
  },
  security: {
    jwtSecret: requireEnv('JWT_SECRET'), // Required - no default
  },
  features: {
    enableAuth: process.env.ENABLE_AUTHENTICATION === 'true',
    debugMode: process.env.DEBUG_MODE === 'true', // defaults to false
  },
  external: {
    // API key required in production, optional in development
    openaiKey: process.env.NODE_ENV === 'production' 
      ? requireEnv('API_KEY_OPENAI')
      : process.env.API_KEY_OPENAI,
  }
};
```

### Environment File Templates

#### .env.example Template Structure
```bash
# ===========================================
# Environment Configuration Template
# ===========================================
# Copy this file to .env and fill in actual values
# DO NOT commit .env to version control

# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database Configuration (REQUIRED)
# Development: mongodb://admin:admin123@localhost:27017/project-jarvis?authSource=admin
# Production: Your production MongoDB URI
MONGODB_URI=mongodb://localhost:27017/project-jarvis

# Security (REQUIRED)
JWT_SECRET=your-super-secret-jwt-key-here

# External Services
# REDIS_URL=redis://localhost:6379
# ELASTICSEARCH_URL=http://localhost:9200

# API Keys (REQUIRED in production)
# API_KEY_OPENAI=your-openai-api-key-here
# WEBHOOK_SECRET=your-webhook-secret

# Feature Flags (optional, defaults to false)
# ENABLE_AUTHENTICATION=true
# DEBUG_MODE=false

# Add other environment variables as needed
```

### File Update Workflow

#### When Adding New Environment Variables:

1. **Determine criticality** - Is this required or optional?
2. **Choose appropriate name** - Follow naming conventions
3. **Update .env** - Add actual value for development:
   ```bash
   # Required API key
   NEW_API_KEY=actual-development-key-here
   
   # Optional configuration
   NEW_TIMEOUT=5000
   ```

4. **Update .env.example** - Add template with proper annotations:
   ```bash
   # External API Configuration (REQUIRED in production)
   # Get your API key from: https://example.com/api-keys
   NEW_API_KEY=your-api-key-here
   
   # Request timeout in milliseconds (optional, defaults to 5000)
   # NEW_TIMEOUT=5000
   ```

5. **Update code** - Use appropriate validation pattern:
   ```typescript
   // For required values
   const apiKey = process.env.NEW_API_KEY;
   if (!apiKey && process.env.NODE_ENV === 'production') {
     throw new Error('NEW_API_KEY is required in production');
   }
   
   // For optional values with defaults
   const timeout = parseInt(process.env.NEW_TIMEOUT || '5000', 10);
   ```

6. **Verify both files** - Ensure consistency and completeness

### Validation and Error Handling

#### Environment Validation Strategy
Create environment validation that runs at startup:

```typescript
// src/config/validation.ts
export interface EnvValidationRule {
  name: string;
  required: boolean;
  requiredIn?: string[]; // environments where it's required
  validator?: (value: string) => boolean;
  errorMessage?: string;
}

const envRules: EnvValidationRule[] = [
  {
    name: 'MONGODB_URI',
    required: true,
    errorMessage: 'Database connection URI is required'
  },
  {
    name: 'JWT_SECRET',
    required: true,
    validator: (value: string) => value.length >= 32,
    errorMessage: 'JWT_SECRET must be at least 32 characters long'
  },
  {
    name: 'API_KEY_OPENAI',
    required: false,
    requiredIn: ['production'],
    errorMessage: 'OpenAI API key is required in production'
  },
  {
    name: 'PORT',
    required: false,
    validator: (value: string) => !isNaN(parseInt(value, 10)),
    errorMessage: 'PORT must be a valid number'
  }
];

export function validateEnvironment(): void {
  const errors: string[] = [];
  const currentEnv = process.env.NODE_ENV || 'development';

  envRules.forEach(rule => {
    const value = process.env[rule.name];
    const isRequired = rule.required || (rule.requiredIn && rule.requiredIn.includes(currentEnv));

    // Check if required value is missing
    if (isRequired && !value) {
      errors.push(rule.errorMessage || `${rule.name} is required`);
      return;
    }

    // Validate value if present and has validator
    if (value && rule.validator && !rule.validator(value)) {
      errors.push(rule.errorMessage || `${rule.name} has invalid value`);
    }
  });

  if (errors.length > 0) {
    console.error('❌ Environment validation failed:');
    errors.forEach(error => console.error(`   - ${error}`));
    console.error('Please check your .env file and ensure all required variables are set');
    process.exit(1);
  }

  console.log('✅ Environment validation passed');
}
```

### Security Guidelines

#### Default Value Security Rules

1. **NEVER provide defaults for sensitive data:**
   ```typescript
   // ❌ DANGEROUS: Default secrets are security vulnerabilities
   const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
   const API_KEY = process.env.API_KEY || 'test-key';
   
   // ✅ SECURE: Force explicit configuration of secrets
   const JWT_SECRET = process.env.JWT_SECRET;
   if (!JWT_SECRET) {
     throw new Error('JWT_SECRET must be explicitly configured');
   }
   ```

2. **Provide safe defaults for non-sensitive configuration:**
   ```typescript
   // ✅ SAFE: Non-sensitive configuration can have defaults
   const PORT = parseInt(process.env.PORT || '3000', 10);
   const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
   const ENABLE_METRICS = process.env.ENABLE_METRICS === 'true';
   ```

#### .env File Security
- **Never commit** `.env` to version control
- **Always commit** `.env.example` to version control
- **Keep .env in .gitignore** (already configured)
- **Use strong, unique values** for secrets in production

### Testing Environment Variables

#### Unit Tests with Environment Overrides
```typescript
// tests/config.test.ts
describe('Environment Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should throw error when required env var is missing', () => {
    delete process.env.MONGODB_URI;
    expect(() => require('../src/config/environment')).toThrow('MONGODB_URI');
  });

  it('should use default values for optional configuration', () => {
    delete process.env.PORT;
    const config = require('../src/config/environment').config;
    expect(config.server.port).toBe(3000);
  });
});
```

### Important Decision Framework

#### When to Provide Defaults vs Throw Errors

**Provide Defaults When:**
- Value is truly optional for application functionality
- Default value is safe and reasonable
- Missing value won't cause security issues
- Examples: PORT, LOG_LEVEL, TIMEOUT values

**Throw Errors When:**
- Value is critical for application security (JWT_SECRET, API_KEY)
- Value is required for core functionality (MONGODB_URI)
- Wrong default could cause data loss or security issues
- Value varies significantly between environments

**Conditional Requirements When:**
- Value is required in production but optional in development
- Value is needed only when certain features are enabled
- Value depends on other environment variables

### Important Notes for Cline

1. **ALWAYS update both** `.env` and `.env.example` when adding environment variables
2. **Decide critically** whether each variable needs a default or should throw an error
3. **Use consistent naming** following the project conventions
4. **Validate required variables** at application startup
5. **Add descriptive comments** in `.env.example` indicating if variables are required
6. **Never provide defaults** for sensitive/security-critical values
7. **Document requirements** clearly (required, optional, conditional)
8. **Group related variables** with section comments
9. **Test error handling** for missing required variables
10. **Keep .env secure** and never commit it

### Quick Reference Commands

```bash
# Copy template to create local environment
cp .env.example .env

# Validate environment file syntax
node -e "require('dotenv').config(); console.log('✅ Environment loaded successfully');"

# Test missing required variables (should fail)
NODE_ENV=production node -c "require('./src/config/environment')"
```

## ⚠️ CRITICAL: Error Handling Guidelines

### Error Directory Structure
- **ALL error types MUST be in `src/errors/` directory**
- Organize by domain: `src/errors/database/`, `src/errors/validation/`, etc.
- Export all errors from `src/errors/index.ts`

### Custom Error Requirements
- **NEVER use generic `Error` class** - Always create specific error classes
- **NEVER throw strings** or plain objects
- **Create meaningful, descriptive error classes** for each use case

#### Examples:
```typescript
// ❌ WRONG
throw new Error('User not found');
throw 'Something failed';

// ✅ CORRECT  
throw new DocumentNotFoundError('users', { id: userId });
throw new InvalidFieldFormatError('email', 'valid email address', email);
throw new DatabaseConnectionError();
```

### Base Error System

#### Base AppError Class
```typescript
// src/errors/base/AppError.ts
export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly context?: Record<string, any>;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: number,
    message: string,
    context?: Record<string, any>,
    isOperational = true
  ) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
    this.context = context;
    this.isOperational = isOperational;

    // Maintains proper stack trace (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Set prototype for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }

  // Utility methods for error handling
  toJSON(): Record<string, any> { /* ... */ }
  toClientResponse(): Record<string, any> { /* ... */ }
}
```

#### Available Error Types

**Validation Errors** (`src/errors/validation/ValidationError.ts`):
- `ValidationError` - General validation failures
- `MissingRequiredFieldError` - Required fields missing  
- `InvalidFieldFormatError` - Invalid field formats

**Database Errors** (`src/errors/database/DatabaseError.ts`):
- `DatabaseError` - General database issues
- `DatabaseConnectionError` - Connection failures
- `DocumentNotFoundError` - Document/record not found
- `DuplicateDocumentError` - Duplicate key/document conflicts

#### Usage Examples
```typescript
// Import from errors index
import { 
  AppError, 
  ValidationError, 
  DocumentNotFoundError,
  DatabaseConnectionError 
} from '../errors';

// Validation error
throw new MissingRequiredFieldError('email');

// Database errors
throw new DocumentNotFoundError('users', { id: userId });
throw new DatabaseConnectionError(connectionString);

// Custom validation
throw new InvalidFieldFormatError('email', 'valid email format', userInput);
```

#### Error Factory Utility
```typescript
import { ErrorFactory } from '../errors';

// Check if error is operational vs programming error
if (ErrorFactory.isOperationalError(error)) {
  // Handle gracefully
} else {
  // Programming error - log and crash
}
```

### Error Extension Pattern
When creating new error types:

1. **Extend AppError** - Never extend Error directly
2. **Follow naming convention** - Use descriptive names ending in "Error"  
3. **Include context** - Add relevant data for debugging
4. **Use appropriate HTTP codes** - 400s for client errors, 500s for server errors
5. **Export from index** - Add to `src/errors/index.ts`

```typescript
// Example: New error type
export class EmailAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(
      'EmailAlreadyExistsError',
      409,
      `Email address '${email}' is already registered`,
      { email }
    );
  }
}
```

### Important Notes for Cline
1. **Always use custom error classes** - Never use generic Error
2. **Organize errors in `src/errors/`** with domain-based subdirectories
3. **Export all errors** from `src/errors/index.ts`
4. **Include context data** in error constructors for debugging
5. **Use descriptive names** that clearly indicate the error condition
6. **Extend AppError** - Never extend Error directly
7. **Choose appropriate HTTP status codes** for each error type
8. **Import from `src/errors`** index file in controllers/services
9. **ONLY generate required code** - Never create unnecessary classes, utilities, or features "just in case"
10. **Check lint/prettier configs BEFORE making changes** - Review `.eslintrc.json`, `eslint.config.js`, and `.prettierrc` first
11. **Use `npm run lint -- --fix`** to auto-fix formatting issues when possible
12. **Remove unused code immediately** - Delete any generated code that isn't being utilized
13. **Focus on current requirements** - Build only what the task specifically needs, not speculative features
14. **Use `unknown` instead of `any`** for better type safety when type is uncertain
15. **Run `npm run build:all`** after changes to verify everything still compiles correctly
