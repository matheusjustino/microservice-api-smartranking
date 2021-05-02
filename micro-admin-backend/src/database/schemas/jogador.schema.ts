import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// INTERFACES
import { Categoria } from '../interfaces/categorias/categoria.interface';

@Schema({ timestamps: true })
export class Jogador extends Document {
	@Prop({ type: String })
	public telefoneCelular: string;

	@Prop({ type: String, unique: true })
	public email: string;

	@Prop({ type: String })
	public nome: string;

	@Prop({ type: String })
	public ranking: string;

	@Prop({ type: Number })
	public posicaoRanking: number;

	@Prop({ type: String })
	public urlFotoJogador: string;

	@Prop({ type: Types.ObjectId, ref: 'Categoria' })
	public categoria: Categoria;
}

export const JogadorSchema = SchemaFactory.createForClass(Jogador);
