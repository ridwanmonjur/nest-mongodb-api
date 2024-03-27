import { IsNumber, IsMongoId, Min, IsOptional } from 'class-validator';
import {  Transform, Type } from 'class-transformer';

export class PaginationParams {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;
 
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}