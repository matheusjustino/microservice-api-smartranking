import { IsNotEmpty } from 'class-validator';
import { Resultado } from '../interfaces/desafios-resultado.interface';

export class AtribuirDesafioPartidaDto {
	@IsNotEmpty()
	public def: string;

	@IsNotEmpty()
	public resultado: Resultado[];
}
