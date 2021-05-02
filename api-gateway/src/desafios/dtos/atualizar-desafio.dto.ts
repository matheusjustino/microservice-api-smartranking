import { DesafioStatus } from '../enums/desafios-status.enum';
import { IsOptional } from 'class-validator';

export class AtualizarDesafioDto {
	@IsOptional()
	public dataHoraDesafio?: Date;

	@IsOptional()
	public status?: DesafioStatus;
}
