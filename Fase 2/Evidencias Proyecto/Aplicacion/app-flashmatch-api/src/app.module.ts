import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EquiposModule } from './equipos/equipos.module';
import { CanchasModule } from './canchas/canchas.module';
import { PartidosModule } from './partidos/partidos.module';
import { RangosEdadModule } from './rangos-edad/rangos-edad.module';
import { DeportesModule } from './deportes/deportes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    EquiposModule,
    CanchasModule,
    PartidosModule,
    RangosEdadModule,
    DeportesModule
  ],
  providers: [],
})
export class AppModule { }
