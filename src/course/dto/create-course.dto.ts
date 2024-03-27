import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateScheduleDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  classDays: string[];

  @IsString()
  @IsNotEmpty()
  classTime: string;
}

class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    @IsString()
    @IsNotEmpty()
    duration: string;
  
    @IsString()
    @IsNotEmpty()
    level: string;
  
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    topics: string[];
  
    @ValidateNested()
    @Type(() => CreateScheduleDto)
    @IsNotEmpty()
    schedule: CreateScheduleDto;
}
    
  export { CreateCourseDto, CreateScheduleDto }; 
