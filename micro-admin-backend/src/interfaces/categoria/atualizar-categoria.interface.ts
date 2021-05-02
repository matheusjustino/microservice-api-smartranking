import { Evento } from '../../database/interfaces/categorias/categoria.interface';

export interface AtualizarCategoria {
	descricao: string;
	eventos: Evento[];
}
