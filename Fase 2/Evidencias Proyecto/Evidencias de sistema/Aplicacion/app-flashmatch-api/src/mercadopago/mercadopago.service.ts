// src/mercadopago/mercadopago.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MercadoPagoConfig, { Preference } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private mercadopago;

  constructor(private readonly configService: ConfigService) {
    this.mercadopago = new MercadoPagoConfig({accessToken: this.configService.get<any>('MERCADOPAGO_ACCESS_TOKEN')});
  }

  async createPaymentPreference(partidoId: string, userId: string, amount: number, userEmail: string) {
    try {
      const response = await new Preference(this.mercadopago).create({
        body: {
          items: [{
            id: partidoId,
            title: 'Reserva de partido en FlashMatch',
            quantity: 1,
            currency_id: 'CLP',
            unit_price: amount,
          }],
          payer: {
            email: userEmail,
          },
          back_urls: {
            success: `https://yourdomain.com/success`,
            failure: `https://yourdomain.com/failure`,
            pending: `https://yourdomain.com/pending`,
          },
          auto_return: 'approved',
          metadata: {
            partidoId,
            userId,
          }
        }
      });

      return response.init_point;
    } catch (error) {
      throw new Error(`Error al crear la preferencia de pago: ${error.message}`);
    }
  }


  async refundPayment(paymentId: string) {
    try {
      const refund = await this.mercadopago.refunds.create({ payment_id: paymentId });
      return refund.body;
    } catch (error) {
      throw new Error(`Error al procesar el reembolso: ${error.message}`);
    }
  }
}
