import { NotFoundError } from './NotFoundError';

export class ProjectNotFoundError extends NotFoundError {
  constructor(id: string) {
    super('Project', `Project with ID ${id} not found`, 'id', id);
  }
}