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
