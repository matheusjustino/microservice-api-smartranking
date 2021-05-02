import { Document } from 'mongoose';

import { DesafioStatus } from '../enums/desafios-status.enum';
import { Jogador } from '../../jogadores/interfaces/jogador.interface';
import { Partida } from './partida.interface';

export interface Desafios extends Document {
	dataHoraDesafio: Date;
	dataHoraSolicitacao: Date;
	dataHoraResposta: Date;
	status: DesafioStatus;
	solicitante: Jogador;
	categoria: string;
	partida?: Partida;
	jogadores: Jogador[];
}
