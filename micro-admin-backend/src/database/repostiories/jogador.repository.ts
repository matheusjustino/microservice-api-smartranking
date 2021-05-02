import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Jogador } from '../schemas/jogador.schema';

@Injectable()
export class JogadorRepository {
	constructor(
		@InjectModel(Jogador.name)
		private readonly JogadorModel: Model<Jogador>,
	) {}

	public get jogadorModel(): Model<Jogador> {
		return this.JogadorModel;
	}
}
