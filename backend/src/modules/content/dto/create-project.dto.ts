import { IsString, IsOptional, IsArray, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AssetDto {
  @IsUrl()
  url: string;

  @IsString()
  type: string;

  @IsOptional()
  analysis?: any;
}

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssetDto)
  assets: AssetDto[];
}