import {
	IsNotEmpty,
	IsArray,
	ArrayMinSize,
	ArrayMaxSize,
	IsDateString,
	IsString,
} from 'class-validator';
import { Jogador } from '../../jogadores/interfaces/jogador.interface';

export class CriarDesafioDto {
	@IsNotEmpty()
	@IsDateString()
	public dataHoraDesafio: Date;

	@IsNotEmpty()
	public solicitante: string;

	@IsArray()
	@ArrayMinSize(2)
	@ArrayMaxSize(2)
	public jogadores: Jogador[];

	@IsString()
	@IsNotEmpty()
	public categoria: string;
}
