import {
  IsEmail,
  IsString,
  MinLength,
  IsIn,
  ValidateIf,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  // Chỉ nhận 2 giá trị này -> không cho phép tự đăng ký thành ADMIN
  @IsIn(['CUSTOMER', 'SELLER'])
  role: 'CUSTOMER' | 'SELLER';

  // ----- Field dành cho CUSTOMER -----
  @ValidateIf((dto) => dto.role === 'CUSTOMER')
  @IsString()
  @MinLength(1)
  name?: string;

  @ValidateIf((dto) => dto.role === 'CUSTOMER')
  @IsString()
  @MinLength(1)
  phone?: string;

  @ValidateIf((dto) => dto.role === 'CUSTOMER')
  @IsString()
  @MinLength(1)
  address?: string;

  // ----- Field dành cho SELLER -----
  @ValidateIf((dto) => dto.role === 'SELLER')
  @IsString()
  @MinLength(1)
  shopName?: string;
}