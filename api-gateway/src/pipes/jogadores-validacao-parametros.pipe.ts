import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from '@nestjs/common';

export class JogadoresValidacaoParametrosPipe implements PipeTransform {
	public transform(value: any, metadata: ArgumentMetadata) {
		if (!value) {
			throw new BadRequestException(
				`Valor do parâmetro ${metadata.data} é inválido. Value: ${value}`,
			);
		}

		return value;
	}
}
