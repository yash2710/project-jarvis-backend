import { Body, Get, Path, Post, Query, Route, SuccessResponse, Tags, Controller as TsoaController } from 'tsoa';
import { inject, injectable } from 'tsyringe';
import { JarvisController } from '../decorators';
import { SERVICES } from '../ioc';
import { HelloService, ProjectService } from '../services';
import { ListResponse } from '../types/list.types';
import { CreateProjectRequest, ProjectDetailsResponse, ProjectSummaryResponse, Status } from '../types';

@JarvisController({ name: 'ProjectsController', dependencies: ['HelloService'] })
@injectable()
@Route('projects')
@Tags('Projects')
export class ProjectsController extends TsoaController {
  constructor(
      @inject(SERVICES.HELLO_SERVICE) private projectService: HelloService
  ) {
    super();
  }

  @Get('/')
  @SuccessResponse(200, 'Success')
  public async get(): Promise<string> {
    return 'Hello, Projects!';
  }

  @Get('/')
  public async getAllProjects(): Promise<ListResponse<ProjectSummaryResponse>> {
    const projects = await this.projectService.getAllProjects();
    const listResponse : ListResponse<ProjectSummaryResponse> = {
      data: projects,
      total: projects.length,
      size: projects.length,
    };
    return listResponse;
  }

  @Get('/{id}')
  public async getProjectById(@Path() id: string, @Query() status?: Status): Promise<ProjectSummaryResponse | null> {
    return await this.projectService.getProjectById(id, status);
  }

  @Post('/')
  public async createProject(@Body() projectData: CreateProjectRequest): Promise<ProjectDetailsResponse> {
    throw new Error('Not implemented');
    // return await this.projectService.createProject(projectData);
  }
}