import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';

//
import { Jogador } from '../database/schemas/jogador.schema';

// SERVICES
import { JogadoresService } from './jogadores.service';
import { AtualizarJogador } from '../interfaces/jogador/atualizar-jogador.interface';

@Controller('jogadores')
export class JogadoresController {
	private logger = new Logger(JogadoresController.name);

	constructor(private readonly jogadoresService: JogadoresService) {}

	@MessagePattern('criar-jogador')
	public async criatJogador(criarJogador: Jogador): Promise<Jogador> {
		this.logger.log(`(criatJogador) - Payload: ${JSON.stringify(criarJogador)}`);

		const jogador = await this.jogadoresService.criarJogador(criarJogador);

		return jogador;
	}

	@EventPattern('consultar-jogador-por-id')
	public async consultarJogador(jogadorId: string): Promise<Jogador> {
		this.logger.log(`(consultarJogador) - Payload: ${JSON.stringify(jogadorId)}`);

		const jogador = await this.jogadoresService.consultarJogador(jogadorId);

		return jogador;
	}

	@EventPattern('consultar-jogadores')
	public async consultarJogadores(): Promise<Jogador[]> {
		this.logger.log(`(consultarJogadores)`);

		const jogadores = await this.jogadoresService.consultarJogadores();

		return jogadores;
	}

	@MessagePattern('atualizar-jogador')
	public async atualizarJogador(data: {
		jogadorId: string;
		atualizarJogador: AtualizarJogador;
	}): Promise<Jogador> {
		this.logger.log(
			`(atualizarJogador) - Payload: ${JSON.stringify(data.jogadorId)} ${JSON.stringify(
				data.atualizarJogador,
			)}`,
		);

		const jogador = await this.jogadoresService.atualizarJogador(
			data.jogadorId,
			data.atualizarJogador,
		);

		return jogador;
	}

	@MessagePattern('deletar-jogador')
	public async deletarJogador(email: string): Promise<void> {
		this.logger.log(`(deletarJogador) - Payload: ${JSON.stringify(email)}`);

		return await this.jogadoresService.deletarJogador(email);
	}
}
