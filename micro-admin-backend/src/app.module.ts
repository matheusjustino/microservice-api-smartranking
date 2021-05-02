import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './app-config/app-config.module';
import { CategoriaModule } from './categoria/categoria.module';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
	imports: [DatabaseModule, AppConfigModule, CategoriaModule, JogadoresModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
