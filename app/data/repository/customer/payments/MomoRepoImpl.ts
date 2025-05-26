import {MomoRepository} from '@domain/repository/customer/payments/MomoRepository';
import crypto from 'crypto';
import axios from 'axios';
import {delay} from '@util/Utils';

export class MomoRepositoryImpl implements MomoRepository {
  async requestPayment(price: string): Promise<any> {
    const partnerCode = 'MOMO';
    const accessKey = 'F8BBA842ECF85';
    const secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = 'pay with MoMo';
    const redirectUrl = 'myapp://';
    const ipnUrl = 'https://callback.url/notify';
    const amount = price;
    const requestType = 'captureWallet';
    const extraData = '';
    const rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType;

    const signature = crypto
      .createHmac('sha256', secretkey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: 'en',
    };

    try {
      const url = 'https://test-payment.momo.vn/v2/gateway/api/create';
      const response = await axios.post(url, requestBody);

      console.log(`Status of action payment momo : ${response.status}`);
      console.log('Body of action payment momo : ', response.data);
      console.log('payUrl of action payment momo : ', response.data.payUrl);
      const order = {
        status: response.status,
        data: response.data,
      };

      return order;
      // Handle the response here, e.g., redirect the user to the payment gateway.
    } catch (error) {
      console.log(`Problem with request: ${error}`);
    }
  }

  async checkStatus(id: string): Promise<any> {
    const maxRetries = 3; // Adjust the number of retries as per your requirements
    const delayTime = 20000; // 20 seconds delay
    let retries = 0;
    const partnerCode = 'MOMO';
    const accessKey = 'F8BBA842ECF85';
    const secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const requestId = partnerCode + new Date().getTime();
    const orderId = id;
    const rawSignature =
      'accessKey=' +
      accessKey +
      '&orderId=' +
      orderId +
      '&partnerCode=' +
      partnerCode +
      '&requestId=' +
      requestId;
    const signature = crypto
      .createHmac('sha256', secretkey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: partnerCode,
      requestId: requestId,
      orderId: orderId,
      signature: signature,
      lang: 'en',
    };
    while (retries < maxRetries) {
      try {
        const url = 'https://test-payment.momo.vn/v2/gateway/api/query';
        const response = await axios.post(url, requestBody);
        if (response.data.resultCode === 1000) {
          console.log('Retries check payment status time : ', retries);
          await delay(delayTime);
          retries++;
          continue;
        }
        console.log(`Status of payment status : ${response.status}`);
        console.log('Body of payment status: ', response.data);
        return response.data;
      } catch (error) {
        console.log(`Problem with check momo payment status request: ${error}`);
      }
    }
  }
}
