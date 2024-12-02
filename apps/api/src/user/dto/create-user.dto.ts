import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength, ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(3)
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  cover?: string;

  role?: number;
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  @ApiProperty({ type: [CreateUserDto] })
  children?: CreateUserDto[];
}
