import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';

// MODULES
import { ProxyRmqModule } from '../proxyrmq/proxyrmq.module';
import { DesafiosService } from './desafios.service';

@Module({
	imports: [ProxyRmqModule],
	controllers: [DesafiosController],
	providers: [DesafiosService],
	exports: [DesafiosService],
})
export class DesafiosModule {}
