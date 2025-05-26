export interface MomoRepository {
  requestPayment(price: string): Promise<boolean>;
}
