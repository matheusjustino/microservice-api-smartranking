import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';

// MODULES
import { ProxyRmqModule } from '../proxyrmq/proxyrmq.module';
import { CategoriasService } from './categorias.service';

@Module({
	imports: [ProxyRmqModule],
	controllers: [CategoriasController],
	providers: [CategoriasService],
})
export class CategoriasModule {}
