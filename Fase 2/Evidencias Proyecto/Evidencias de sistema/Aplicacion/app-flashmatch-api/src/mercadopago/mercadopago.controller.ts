// src/mercadopago/mercadopago.controller.ts
import { Controller, Post, Body, Req, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { UsuarioPartidoService } from 'src/usuario-partido/usuario-partido.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(
    private readonly usuarioPartidoService: UsuarioPartidoService,
    private readonly mercadopagoService: MercadoPagoService
  ) { }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Body() paymentData: any): Promise<string> {
    try {
      if (paymentData.type === 'payment') {
        const paymentId = paymentData.data.id;

        // Obtener los detalles del pago desde MercadoPago
        const paymentDetails = await this.mercadopagoService.getPaymentDetails(paymentId);
        // Obtener `metadata` y otros datos necesarios del pago
        const metadata = paymentDetails.metadata || {};
        const partidoId = metadata.partido_id;
        const userId = metadata.user_id;
        const amountPaid = paymentDetails.transaction_amount;

        if (!partidoId || !userId) {
          throw new Error('Metadata incompleta en el webhook de pago');
        }

        // Almacena el paymentId y confirma el pago en la tabla de `usuario_partido`
        await this.usuarioPartidoService.confirmPayment(userId, partidoId, paymentId, amountPaid);
      }

      return 'Webhook received and processed successfully';
    } catch (error) {
      throw new Error(`Error processing the webhook: ${error.message}`);
    }
  }
}
