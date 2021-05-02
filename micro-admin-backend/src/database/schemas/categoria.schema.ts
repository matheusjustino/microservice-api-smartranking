import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// INTERFACES
import { Evento } from '../interfaces/categorias/categoria.interface';

@Schema({ timestamps: true })
export class Categoria extends Document {
	@Prop({ type: String, unique: true })
	public categoria: string;

	@Prop({ type: String })
	public descricao: string;

	@Prop({ type: Array })
	public eventos: Evento[];
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
