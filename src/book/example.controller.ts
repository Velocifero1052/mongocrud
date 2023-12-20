import { Body, Controller, Put } from "@nestjs/common";
import { ExampleDto } from "./dto/example.dto";

@Controller()
export class ExampleController {

  @Put("/example")
  examplePut(@Body() body: ExampleDto): any {
    console.log(body);
    return { message: 'body received' };
  }

}