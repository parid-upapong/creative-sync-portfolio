import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        assets: {
          create: data.assets.map(asset => ({
            url: asset.url,
            type: asset.type,
            mimeType: 'image/jpeg', // Simplified for example
            analysis: asset.analysis,
          })),
        },
      },
      include: { assets: true },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      include: { assets: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { assets: true },
    });
  }
}