import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { CreatePaypalDto } from './dto/create-paypal.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('paypal')
@ApiTags('Paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  //todo change return type payment
  @Get('success')
  @ApiOperation({ summary: 'Get status payment success' })
  success(@Query() { token }: any): any {
    console.log(token);
    return true;
    // return this.paypalService.success(token);
  }

  @Post('make-payment')
  @ApiOperation({ summary: 'make payment' })
  makePayment(@Body() body: CreatePaypalDto): Promise<any> {
    return this.paypalService.makePayment(body);
  }

  //todo: BodyDto
  @Post('check-order')
  @ApiOperation({ summary: 'check order info' })
  checkOrder(@Body() body: any): Promise<any> {
    return this.paypalService.checkOrderDetail(body.token, body.id);
  }

  //todo: BodyDto
  @Post('webhook')
  webhook(@Body() body: any): boolean {
    console.log(body);
    return true;
  }
}
