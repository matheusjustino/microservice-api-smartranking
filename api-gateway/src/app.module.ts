import { Module } from '@nestjs/common';

// MODULES
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';
import { ProxyRmqModule } from './proxyrmq/proxyrmq.module';
import { AppConfigModule } from './app-config/app-config.module';
import { AwsModule } from './aws/aws.module';

@Module({
	imports: [
		ProxyRmqModule,
		JogadoresModule,
		CategoriasModule,
		DesafiosModule,
		AppConfigModule,
		AwsModule,
	],
})
export class AppModule {}
