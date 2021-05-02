import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

// DTOS
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

// RMQ PROXY
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {
	private logger = new Logger(`API-GATEWAY: ${JogadoresService.name}`);
	private microAdminClient: ClientProxy = null;

	constructor(
		private readonly clientProxySmartRanking: ClientProxySmartRanking,
	) {
		this.microAdminClient = this.clientProxySmartRanking.microAdminClient;
	}

	public async criarJogador(
		criarJogadorDto: CriarJogadorDto,
	): Promise<Observable<any>> {
		this.logger.log(
			`Criando jogador. DTO: ${JSON.stringify(criarJogadorDto)}`,
		);

		const categoria = await this.microAdminClient
			.send('consultar-categorias-por-id', criarJogadorDto.categoria)
			.toPromise();

		if (categoria) {
			console.log(categoria);
			return this.microAdminClient.emit('criar-jogador', criarJogadorDto);
		} else {
			throw new BadRequestException('Categoria não cadastrada');
		}
	}

	public consultarJogadores(): Observable<any> {
		this.logger.log(`Buscando todos os jogadores.`);

		return this.microAdminClient.send('consultar-jogadores', '');
	}

	public consultarJogador(id: string): Observable<any> {
		this.logger.log(`Buscando jogador de ID: ${id}`);

		return this.microAdminClient.send('consultar-jogador-por-id', id);
	}

	public async atualizarJogador(
		id: string,
		atualizarJogador: AtualizarJogadorDto,
	): Promise<Observable<any>> {
		this.logger.log(
			`Atualizando jogador de ID: ${id}. DTO: ${JSON.stringify(
				atualizarJogador,
			)}`,
		);

		let categoria = null;

		if (atualizarJogador.categoria) {
			this.logger.log(
				`Consultando categoria de ID: ${
					atualizarJogador.categoria
				}. DTO: ${JSON.stringify(atualizarJogador)}`,
			);

			categoria = await this.microAdminClient
				.send('consultar-categorias-por-id', atualizarJogador.categoria)
				.toPromise();
		}

		if (atualizarJogador.categoria && !categoria) {
			throw new BadRequestException('Categoria não cadastrada');
		}

		return this.microAdminClient.emit('atualizar-jogador', {
			jogadorId: id,
			atualizarJogador,
		});
	}

	public deletarJogador(email: string): Observable<any> {
		this.logger.log(`Deletando jogador com email: ${email}`);

		return this.microAdminClient.emit('deletar-jogador', email);
	}
}
