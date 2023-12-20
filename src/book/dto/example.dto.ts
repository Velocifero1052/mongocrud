import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schemas/book.schema";

export class ExampleDto {
  name: string;
  method: string;
}