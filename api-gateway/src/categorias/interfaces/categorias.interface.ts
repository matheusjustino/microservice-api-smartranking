import { Jogador } from '../../jogadores/interfaces/jogador.interface';

export interface Categorias {
	readonly _id?: string;
	readonly categoria: string;
	descricao: string;
	eventos: Evento[];
	jogadores: Jogador[];
}

export interface Evento {
	nome: string;
	operacao: string;
	valor: number;
}
