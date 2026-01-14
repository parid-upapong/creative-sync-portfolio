import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Request() req, @Body() createProjectDto: CreateProjectDto) {
    // In a real app, userId comes from JWT/Auth Guard
    const userId = req.user.id; 
    return this.projectService.create(userId, createProjectDto);
  }

  @Get()
  async getUserProjects(@Request() req) {
    const userId = req.user.id;
    return this.projectService.findAllByUser(userId);
  }

  @Get(':id')
  async getProjectDetails(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }
}