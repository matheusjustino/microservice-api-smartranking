import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from '../schemas/categoria.schema';

@Injectable()
export class CategoriaRepository {
	constructor(
		@InjectModel(Categoria.name)
		private readonly CategoriaModel: Model<Categoria>,
	) {}

	public get categoriaModel(): Model<Categoria> {
		return this.CategoriaModel;
	}
}
