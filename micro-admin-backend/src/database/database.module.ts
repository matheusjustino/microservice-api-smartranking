import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// MODULES
import { AppConfigModule } from '../app-config/app-config.module';

// SERVICES
import { AppConfigService } from '../app-config/app-config.service';

// REPOSITORIES
import { CategoriaRepository } from './repostiories/categoria.repository';
import { JogadorRepository } from './repostiories/jogador.repository';

// PROVIDERS
import { modelsProviderAsync } from './models.provider';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: (appConfigService: AppConfigService) => ({
				uri: appConfigService.databaseUrl,
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}),
			inject: [AppConfigService],
		}),
		MongooseModule.forFeatureAsync(modelsProviderAsync),
	],
	providers: [CategoriaRepository, JogadorRepository],
	exports: [CategoriaRepository, JogadorRepository],
})
export class DatabaseModule {}
