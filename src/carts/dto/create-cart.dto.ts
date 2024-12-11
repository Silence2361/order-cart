import { IsInt, IsPositive } from 'class-validator';

export class CreateCartDto {
  @IsInt({ message: 'User ID must be an integer' })
  user_id: number;

  @IsInt({ message: 'Product ID must be an integer' })
  product_id: number;

  @IsInt({ message: 'Quantity must be an integer' })
  @IsPositive({ message: 'Quantity must be greater than zero' })
  quantity: number;
}
