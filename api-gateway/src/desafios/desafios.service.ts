import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

// PROXY RMQ
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy';

// DTO's
import { CriarDesafioDto } from './dtos/criar-desafio.dto';

// INTERFACES
import { Jogador } from '../jogadores/interfaces/jogador.interface';

@Injectable()
export class DesafiosService {
	private logger = new Logger(`API-GATEWAY: ${DesafiosService.name}`);
	private microAdminClient: ClientProxy = null;
	private microDesafiosClient: ClientProxy = null;

	constructor(
		private readonly clientProxySmartRanking: ClientProxySmartRanking,
	) {
		this.microAdminClient = this.clientProxySmartRanking.microAdminClient;
		this.microDesafiosClient = this.clientProxySmartRanking.microDesafiosClient;
	}

	@MessagePattern()
	public async criarDesafio(criarDesafioDto: CriarDesafioDto) {
		this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`);

		/*
			Validações relacionadas ao array de jogadores que participam
			do desafio
		*/
		const jogadores: Jogador[] = await this.microAdminClient
			.send('consultar-jogadores', '')
			.toPromise();

		console.log(jogadores);
		criarDesafioDto.jogadores.map((jogadorDto) => {
			const jogadorFilter: Jogador[] = jogadores.filter(
				(jogador) => jogador._id == jogadorDto._id,
			);

			this.logger.log(`jogadorFilter: ${JSON.stringify(jogadorFilter)}`);

			/*
				Verificamos se os jogadores do desafio estão cadastrados
			*/
			if (jogadorFilter.length === 0) {
				throw new BadRequestException(
					`O id ${jogadorDto._id} não é um jogador`,
				);
			}

			/*
				Verificar se os jogadores fazem parte da categoria informada no
				desafio
			*/
			if (jogadorFilter[0].categoria != criarDesafioDto.categoria) {
				throw new BadRequestException(
					`O jogador ${jogadorFilter[0]._id} não faz parte da categoria informada`,
				);
			}
		});

		/*
			Verificamos se o solicitante é um jogador da partida
		*/
		const solicitanteEhJogadorDaPartida: Jogador[] = criarDesafioDto.jogadores.filter(
			(jogador) => jogador._id == criarDesafioDto.solicitante,
		);

		this.logger.log(
			`solicitanteEhJogadorDaPartida: ${JSON.stringify(
				solicitanteEhJogadorDaPartida,
			)}`,
		);

		if (solicitanteEhJogadorDaPartida.length === 0) {
			throw new BadRequestException(
				`O solicitante deve ser um jogador da partida!`,
			);
		}

		/*
			Verificamos se a categoria está cadastrada
		*/
		const categoria = await this.microAdminClient
			.send('consultar-categorias', criarDesafioDto.categoria)
			.toPromise();

		this.logger.log(`categoria: ${JSON.stringify(categoria)}`);

		if (!categoria) {
			throw new BadRequestException(`Categoria informada não existe!`);
		}

		return this.microDesafiosClient.emit('criar-desafio', criarDesafioDto);
	}
}
