import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { Evento } from '../interfaces/categorias.interface';

export class AtualizarCategoriaDto {
	@IsString()
	@IsOptional()
	public descricao: string;

	@IsArray()
	@ArrayMinSize(1)
	public eventos: Evento[];
}
