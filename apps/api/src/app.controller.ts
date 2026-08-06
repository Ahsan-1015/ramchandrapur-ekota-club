import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API Root Health Check' })
  getHealthCheck() {
    return {
      status: 'online',
      message: 'Ramchandrapur Ekota Club API Service is running',
      version: '1.0.0',
      swaggerDocs: 'http://localhost:5000/api/docs',
      timestamp: new Date().toISOString(),
    };
  }
}
