// src/pago/pago.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ProcesarPagoDto } from './dto/procesar-pago.dto';
import { ReembolsoDto } from './dto/reembolso.dto';

@Injectable()
export class PagoService {
  private readonly logger = new Logger(PagoService.name);

  async procesarPago(procesarPagoDto: ProcesarPagoDto): Promise<{ status: string }> {
    const { idReserva, monto } = procesarPagoDto;
    // Lógica para procesar el pago parcial o completo con el proveedor de pagos.
    // Por ejemplo, aquí integras con la API de MercadoPago o Stripe.
    this.logger.log(`Procesando pago para reserva ${idReserva} por un monto de ${monto}.`);
    
    // Simulación de respuesta exitosa del proveedor de pagos
    return { status: 'Pago procesado exitosamente' };
  }

  async procesarReembolso(reembolsoDto: ReembolsoDto): Promise<{ status: string }> {
    const { idReserva, porcentaje } = reembolsoDto;
    const montoReembolso = this.calcularMontoReembolso(idReserva, porcentaje);
    this.logger.log(`Procesando reembolso para reserva ${idReserva} por un ${porcentaje}% (monto: ${montoReembolso}).`);
    
    // Lógica para procesar el reembolso con el proveedor de pagos.
    return { status: 'Reembolso procesado exitosamente' };
  }

  private calcularMontoReembolso(idReserva: string, porcentaje: number): number {
    // Simulación del cálculo del monto de reembolso basado en el porcentaje.
    const montoOriginal = 100; // Esto debería obtenerse del registro de la reserva
    return (montoOriginal * porcentaje) / 100;
  }
}
