import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';

// MODULES
import { DatabaseModule } from './../database/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [CategoriaService],
	controllers: [CategoriaController],
})
export class CategoriaModule {}
