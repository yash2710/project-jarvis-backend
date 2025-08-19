import {
  Controller as TsoaController,
  Get,
  Post,
  Route,
  Tags,
  Body,
  SuccessResponse,
} from 'tsoa';
import { JarvisController } from '../decorators/Controller';
import { injectable, inject } from 'tsyringe';
import { SERVICES } from '../ioc/constants';
import { HelloService } from '../services/HelloService';
import { HelloResponse, CreateHelloRequest } from '../types';

@JarvisController({ name: 'HelloController', dependencies: ['HelloService'] })
@injectable()
@Route('hello')
@Tags('Hello')
export class HelloController extends TsoaController {
  constructor(
    @inject(SERVICES.HELLO_SERVICE) private helloService: HelloService
  ) {
    super();
  }

  /**
   * Get a hello message from the database
   */
  @Get('/')
  @SuccessResponse(200, 'Success')
  public async getHello(): Promise<HelloResponse> {
    return await this.helloService.getLatestHello();
  }

  /**
   * Create a new hello message in the database
   */
  @Post('/')
  @SuccessResponse(201, 'Created')
  public async createHello(
    @Body() requestBody: CreateHelloRequest
  ): Promise<HelloResponse> {
    return await this.helloService.createHello(requestBody);
  }
}
