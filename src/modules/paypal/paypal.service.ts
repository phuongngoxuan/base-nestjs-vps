import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as config from 'config';
import { CreatePaypalDto } from './dto/create-paypal.dto';
import { PaypalConfigDto } from './dto/paypal-config.dto';
const paypal = config.get<PaypalConfigDto>('paypal');

@Injectable()
export class PaypalService {
  async authentication(): Promise<string> {
    const response = await axios.post(
      `${paypal.base_url}/v1/oauth2/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(paypal.client_id + ':' + paypal.client_secret).toString('base64')}`,
        },
      },
    );
    return `${response.data.token_type} ${response.data.access_token}`;
  }

  //   async success(pay_id): Promise<any> {
  //     const paymentResult = await this.paypalModel.findOne({ pay_id });
  //     if (!paymentResult) {
  //       throw new NotFoundException('The transaction is not found');
  //     }
  //     // get AT
  //     const token = await this.authentication();

  //     // check payment info
  //     const payment = await this.checkOrderDetail(token, pay_id);

  //     if (payment.status === TransactionStatus.APPROVED) {
  //       const captureOrderResult = await this.captureOrder(token, pay_id);
  //       if (captureOrderResult.status === TransactionStatus.COMPLETED) {
  //         await Promise.all([
  //           this.logsService.createLog('PaypalService -> success: ', payment),
  //           this.paypalModel.findOneAndUpdate({ pay_id }, { status: captureOrderResult.status }),
  //           this.itemsService.updateStatusItem([paymentResult?.reference_id]),
  //         ]);
  //         return captureOrderResult;
  //       }
  //     }
  //     throw new BadRequestException('Something went wrong with your order');
  //   }

  async makePayment(createPaypalDto: CreatePaypalDto): Promise<any> {
    const { itemId, returnUrl, cancelUrl } = createPaypalDto;
    const token = await this.authentication();
    // todo check items
    // const item = await this.itemsService.findOne({ _id: itemId });
    // if (!item) {
    //   throw new NotFoundException('Item not found');
    // }

    // todo get price items
    // const pricingPlanId = item.package._id;
    // const pricingPlan = await this.pricingPlanService.findOne(pricingPlanId);
    const pricingPlan = '100.00';
    const transaction = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: itemId,
          amount: {
            currency_code: 'USD',
            value: pricingPlan,
          },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            payment_method_selected: 'PAYPAL',
            brand_name: 'EXAMPLE INC',
            locale: 'en-US',
            landing_page: 'LOGIN',
            shipping_preference: 'SET_PROVIDED_ADDRESS',
            user_action: 'PAY_NOW',
            return_url: returnUrl,
            cancel_url: cancelUrl,
          },
        },
      },
    };
    console.log('start create order');
    const paymentResult = await this.createOrder(token, transaction);

    // await Promise.all([
    //   this.logsService.createLog('PaypalService -> makePayment: ', paymentResult),
    //   this.paypalModel.create({ ...paymentResult, reference_id: itemId, pay_id: paymentResult['id'] }),
    // ]);
    return paymentResult;
  }

  async createOrder(Authorization: string, transaction): Promise<any> {
    const response = await axios.post(`${paypal.base_url}/v2/checkout/orders`, transaction, {
      headers: {
        'Content-Type': 'application/json',
        Authorization,
        'PayPal-Request-Id': uuidv4(),
      },
    });
    return response.data;
  }

  // todo DTO response
  async checkOrderDetail(Authorization: string, orderId: string): Promise<any> {
    const response = await axios.get(`${paypal.base_url}/v2/checkout/orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
    });
    return response.data;
  }
}
