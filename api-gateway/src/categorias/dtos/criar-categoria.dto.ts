import { Evento } from '../interfaces/categorias.interface';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CriarCategoriaDto {
	@IsString()
	@IsNotEmpty()
	public readonly categoria: string;

	@IsString()
	@IsNotEmpty()
	public descricao: string;

	@IsArray()
	@ArrayMinSize(1)
	public eventos: Evento[];
}
