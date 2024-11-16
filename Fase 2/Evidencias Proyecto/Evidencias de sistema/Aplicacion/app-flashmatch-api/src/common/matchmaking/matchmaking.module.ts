import { Module } from '@nestjs/common';
import { MatchmakingService } from './matchmaking.service';
import { MatchmakingController } from './matchmaking.controller';

@Module({
  controllers: [MatchmakingController],
  providers: [MatchmakingService],
})
export class MatchmakingModule {}
