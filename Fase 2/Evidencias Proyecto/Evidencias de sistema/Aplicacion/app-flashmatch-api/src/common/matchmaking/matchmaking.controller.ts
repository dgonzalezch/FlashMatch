import { Controller, Get, Param, Query } from '@nestjs/common';
import { MatchmakingService } from './matchmaking.service';

@Controller('matchmaking')
export class MatchmakingController {
  constructor(private readonly matchmakingService: MatchmakingService) {}

  @Get(':usuarioId')
  async buscarPartido(@Param('usuarioId') usuarioId: string, @Query('radio') radio: number) {
    return this.matchmakingService.encontrarPartido(usuarioId, radio);
  }

  @Get('unirse/:partidoId/:usuarioId')
  async unirse(@Param('partidoId') partidoId: string, @Param('usuarioId') usuarioId: string) {
    return this.matchmakingService.unirseAPartido(partidoId, usuarioId);
  }
}
