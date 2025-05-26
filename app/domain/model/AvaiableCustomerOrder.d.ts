export interface AvailableCustomerOrder {
  orderId: string;
  customerId: string;
  driverOrderId: string;
  from: string;
  to: string;
  receiver: string;
  receiverPhone: string;
  packageType: string;
  packageWeight: string;
  note?: string;
  date: string;
  orderStatus: string;
  price?: string;
  paymentMethod?: string;
}
