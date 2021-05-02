import { Module } from '@nestjs/common';
import { JogadorController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

// MODULES
import { ProxyRmqModule } from './../proxyrmq/proxyrmq.module';
import { AwsModule } from '../aws/aws.module';

@Module({
	imports: [ProxyRmqModule, AwsModule],
	controllers: [JogadorController],
	providers: [JogadoresService],
})
export class JogadoresModule {}
