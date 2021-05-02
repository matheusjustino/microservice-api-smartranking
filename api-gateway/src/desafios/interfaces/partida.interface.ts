import { Document } from 'mongoose';

import { Jogador } from '../../jogadores/interfaces/jogador.interface';
import { Resultado } from './desafios-resultado.interface';

export interface Partida extends Document {
	categoria?: string;
	desafio?: string;
	jogadores?: Jogador[];
	def?: Jogador;
	resultado?: Resultado[];
}
