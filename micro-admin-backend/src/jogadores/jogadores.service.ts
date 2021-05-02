import { Injectable } from '@nestjs/common';

// SCHEMAS
import { Jogador } from '../database/schemas/jogador.schema';

// REPOSITORIES
import { JogadorRepository } from '../database/repostiories/jogador.repository';

// INTERFACES
import { AtualizarJogador } from '../interfaces/jogador/atualizar-jogador.interface';

@Injectable()
export class JogadoresService {
	constructor(private readonly jogadorRepository: JogadorRepository) {}

	public async criarJogador(criarJogador: Jogador): Promise<Jogador> {
		const jogador = await this.jogadorRepository.jogadorModel.create(criarJogador);

		return jogador;
	}

	public async consultarJogadores(): Promise<Jogador[]> {
		const jogadores = await this.jogadorRepository.jogadorModel.find();

		return jogadores;
	}

	public async consultarJogador(jogadorId: string): Promise<Jogador> {
		const jogador = await this.jogadorRepository.jogadorModel.findById(jogadorId);

		return jogador;
	}

	public async atualizarJogador(jogadorId: string, atualizarJogador): Promise<Jogador> {
		const jogador = await this.jogadorRepository.jogadorModel.findByIdAndUpdate(
			jogadorId,
			{
				$set: atualizarJogador,
			},
			{
				new: true,
			},
		);

		return jogador;
	}

	public async deletarJogador(email: string): Promise<void> {
		await this.jogadorRepository.jogadorModel.remove({ email });
	}
}
