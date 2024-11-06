// src/mercadopago/mercadopago.controller.ts
import { Controller, Post, Body, Req, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { UsuarioPartidoService } from 'src/usuario-partido/usuario-partido.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(
    private readonly usuarioPartidoService: UsuarioPartidoService,
  ) { }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Body() paymentData: any): Promise<string> {
    try {
      if (paymentData.type === 'payment') {
        const paymentId = paymentData.data.id;
        const metadata = paymentData.data.metadata || {};
        const partidoId = metadata.partidoId;
        const userId = metadata.userId;

        if (!partidoId || !userId) {
          throw new Error('Metadata incompleta en el webhook de pago');
        }

        // Almacena el paymentId en la tabla de `usuario_partido`
        await this.usuarioPartidoService.confirmPayment(userId, partidoId, paymentId, paymentData.data.transaction_amount);
      }

      return 'Webhook received and processed successfully';
    } catch (error) {
      throw new Error(`Error processing the webhook: ${error.message}`);
    }
  }
}
