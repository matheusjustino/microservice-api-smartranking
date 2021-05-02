import { Document } from 'mongoose';

export interface AtualizarJogador extends Document {
	telefoneCelular?: string;
	email?: string;
	nome?: string;
	ranking?: string;
	posicaoRanking?: string;
	urlFotoJogador?: string;
	categoria?: string;
}
