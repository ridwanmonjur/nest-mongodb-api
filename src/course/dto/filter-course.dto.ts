import { IsOptional } from 'class-validator';

export class CourseFilterDto {
  @IsOptional()
  startDate?: any;

  @IsOptional()
  endDate?: any;
}

