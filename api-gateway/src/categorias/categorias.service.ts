import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

//DTOS
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

// RMQ PROXY
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Injectable()
export class CategoriasService {
	private logger = new Logger(`API-GATEWAY: ${CategoriasService.name}`);
	private microAdminClient: ClientProxy = null;

	constructor(
		private readonly clientProxySmartRanking: ClientProxySmartRanking,
	) {
		this.microAdminClient = this.clientProxySmartRanking.microAdminClient;
	}

	public criarCategoria(
		criarCategoriaDto: CriarCategoriaDto,
	): Observable<any> {
		this.logger.log(
			`Criando categoria. DTO: ${JSON.stringify(criarCategoriaDto)}`,
		);

		return this.microAdminClient.emit('criar-categoria', criarCategoriaDto);
	}

	public atribuirCategoriaJogador(params: string[]): Observable<any> {
		this.logger.log(
			`Atualizando categoria do jogador de ID: ${
				params['idJogador']
			}. DTO: ${JSON.stringify(params['categoria'])}`,
		);

		return this.microAdminClient.emit(
			'consultar-categoria-do-jogador',
			params,
		);
	}

	public consultarCategorias(): Observable<any> {
		this.logger.log(`Buscando todas as categorias`);

		return this.microAdminClient.send('consultar-categorias', '');
	}

	public consultarCategoriaPeloId(categoriaId: string): Observable<any> {
		this.logger.log(`Buscando categoria de ID: ${categoriaId}`);

		return this.microAdminClient.send(
			'consultar-categorias-por-id',
			categoriaId,
		);
	}

	public atualizarCategoria(
		categoriaId: string,
		atualizarCategoria: AtualizarCategoriaDto,
	): Observable<any> {
		this.logger.log(
			`Atualizando categoria de ID: ${categoriaId}. DTO: ${JSON.stringify(
				atualizarCategoria,
			)}`,
		);

		return this.microAdminClient.emit('atualizar-categoria', {
			categoriaId,
			atualizarCategoria,
		});
	}
}
