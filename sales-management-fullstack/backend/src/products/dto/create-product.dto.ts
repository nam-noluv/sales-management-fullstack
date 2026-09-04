import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  categoryId?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
