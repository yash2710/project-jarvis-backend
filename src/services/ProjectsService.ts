import { injectable } from 'tsyringe';
import { Service } from '../decorators';
import { CreateProjectRequest, ProjectDetailsResponse, ProjectSummaryResponse, Status, StatusValues } from '../types';
import { Project } from '../models';
import { ProjectNotFoundError, ValidationError } from '../errors';

@Service({ name: 'ProjectService' })
@injectable()
export class ProjectService {


  async getAllProjects(): Promise<ProjectSummaryResponse[]> {
    // Simulate a database call
    const projects = await Project.find({ status: StatusValues.ACTIVE });
    return projects.map(project => project.toDto());
  }

  async getProjectById(id: string, status?: Status): Promise<ProjectDetailsResponse> {
    const project = await Project.findOne({ id, status: status || StatusValues.ACTIVE });
    if (!project) {
      throw new ProjectNotFoundError(id);
    }
    return project.toDto();
  }

  async createProject(projectData: CreateProjectRequest): Promise<ProjectSummaryResponse> {
    // validate project name length
    if (projectData.name.length < 3 || projectData.name.length > 50) {
      throw new ValidationError('Project name must be between 3 and 50 characters.');
    }
    // validate ownerId exists in DB
    // validate members all exist in DB

    const project = new Project({
      ...projectData,
      status: StatusValues.ACTIVE,
    });
    await project.save();
    return project.toDto();
  }
}