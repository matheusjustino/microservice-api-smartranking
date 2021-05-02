import { PipeTransform, BadRequestException } from '@nestjs/common';
import { DesafioStatus } from '../desafios/enums/desafios-status.enum';

export class DesafioStatusValidacaoPipe implements PipeTransform {
	readonly statusPermitidos = [
		DesafioStatus.ACEITO,
		DesafioStatus.NEGADO,
		DesafioStatus.CANCELADO,
	];

	public transform(value: any) {
		const status = value.status.toUpperCase();

		if (!this.ehStatusValido(status)) {
			throw new BadRequestException(`${status} é um status inválido`);
		}

		return value;
	}

	private ehStatusValido(status: any) {
		const index = this.statusPermitidos.indexOf(status);
		// -1 se o elemento não for encontrado
		return index !== -1;
	}
}
