import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

interface AICompositionInput {
  aesthetic: string;
  spacing: string;
  typography: any;
  sections: any[];
}

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}

  /**
   * Orchestrates the mapping between AI-generated layout intent 
   * and the physical template system.
   */
  async applyAiComposition(userId: string, composition: AICompositionInput) {
    // 1. Find the best matching template based on AI aesthetic intent
    const template = await this.prisma.template.findFirst({
      where: { 
        slug: { 
          contains: composition.aesthetic.toLowerCase() 
        } 
      },
    });

    if (!template) {
      throw new NotFoundException('No matching template found for the AI aesthetic profile.');
    }

    // 2. Persist the AI-generated layout schema to the user's site configuration
    return this.prisma.siteConfig.upsert({
      where: { userId },
      update: {
        templateId: template.id,
        layoutEngine: composition as any,
        published: true,
      },
      create: {
        userId,
        templateId: template.id,
        layoutEngine: composition as any,
        published: true,
      },
    });
  }

  /**
   * Retrieves the full structural data for the site generator (SSG/ISR)
   */
  async getSiteManifest(userId: string) {
    const config = await this.prisma.siteConfig.findUnique({
      where: { userId },
      include: { 
        user: {
          include: {
            projects: {
              include: { assets: true },
              orderBy: { displayOrder: 'asc' }
            }
          }
        }
      }
    });

    if (!config) throw new NotFoundException('Site configuration not found');

    const template = await this.prisma.template.findUnique({
      where: { id: config.templateId }
    });

    return {
      user: config.user.name,
      template: template.componentPath,
      layout: config.layoutEngine,
      content: config.user.projects,
    };
  }
}