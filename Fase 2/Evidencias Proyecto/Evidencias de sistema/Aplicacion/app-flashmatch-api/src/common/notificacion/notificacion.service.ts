import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './entities/notificacion.entity';

@Injectable()
export class NotificacionService {
  private readonly logger = new Logger('NotificacionService');
  
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,
  ) {}

  // Método para enviar una notificación push
  async sendPushNotification(userId: string, title: string, message: string) {
    // Aquí va la lógica para enviar notificaciones push usando, por ejemplo, Firebase Cloud Messaging (FCM)
    // Ejemplo con FCM (esto requiere configuración adicional con Firebase):
    // await firebaseAdmin.messaging().sendToDevice(userDeviceToken, payload, options);
    this.logger.log(`Notificación push enviada a usuario ${userId}: ${title} - ${message}`);
  }

  // Método para enviar notificación por correo
  async sendEmailNotification(to: string, subject: string, body: string) {
    // Configuración de nodemailer para el correo electrónico
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // o cualquier servicio de correo que uses
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to,
      subject,
      text: body,
    };

    try {
      await transporter.sendMail(mailOptions);
      this.logger.log(`Correo electrónico enviado a ${to}: ${subject}`);
    } catch (error) {
      this.logger.error('Error enviando correo:', error);
    }
  }

  // Método para notificaciones en la aplicación (guardadas en la base de datos)
  async createInAppNotification(userId: string, mensaje: string) {
    const notificacion = this.notificacionRepository.create({
      usuario: { id_usuario: userId },
      mensaje,
      leido: false,
    });
  
    await this.notificacionRepository.save(notificacion);
    this.logger.log(`Notificación creada para usuario ${userId}: ${mensaje}`);
  }
  
  sendNotification(userId: string, message: string) {
    // Lógica para enviar la notificación
    console.log(`Notificación para ${userId}: ${message}`);
  }

  async notificarCambioEstado(partidoId: string, mensaje: string) {
    // Lógica para enviar notificación de cambio de estado
  }

  async notificarConfirmacionFinal(partidoId: string, mensaje: string) {
    // Lógica para enviar notificación de confirmación final
  }

  async notificarSancion(userId: string, mensaje: string) {
    // Lógica para notificar sanciones al usuario
  }
}
