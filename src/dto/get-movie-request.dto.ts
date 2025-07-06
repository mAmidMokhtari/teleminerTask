import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class GetMovieRequest {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsString()
  with_genres?: string;

  @IsOptional()
  @IsString()
  api_key?: string;
}
