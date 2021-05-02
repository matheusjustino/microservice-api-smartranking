import { AsyncModelFactory } from '@nestjs/mongoose';

// SCHEMAS
import { Jogador, JogadorSchema } from './schemas/jogador.schema';
import { Categoria, CategoriaSchema } from './schemas/categoria.schema';

export const modelsProviderAsync: AsyncModelFactory[] = [
	{
		name: Jogador.name,
		collection: 'jogadores',
		useFactory: () => JogadorSchema,
	},
	{
		name: Categoria.name,
		collection: 'categorias',
		useFactory: () => CategoriaSchema,
	},
];
