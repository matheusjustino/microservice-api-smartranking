import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

// REPOSITORIES
import { CategoriaRepository } from '../database/repostiories/categoria.repository';

// INTERFACES
import { Categoria } from '../database/interfaces/categorias/categoria.interface';
import { AtualizarCategoria } from '../interfaces/categoria/atualizar-categoria.interface';

@Injectable()
export class CategoriaService {
	private readonly logger = new Logger(CategoriaService.name);

	constructor(private readonly categoriaRepository: CategoriaRepository) {}

	public async criarCategoria(categoria: Categoria): Promise<Categoria> {
		try {
			const categoriaCriada = new this.categoriaRepository.categoriaModel(categoria);

			this.logger.log('Categoria criada');

			return await categoriaCriada.save();
		} catch (error) {
			this.logger.error(`error: ${JSON.stringify(error.message)}`);
			throw new RpcException(error.message);
		}
	}

	public async buscarCategoriaPeloId(categoriaId: string): Promise<Categoria> {
		try {
			const categoria = await this.categoriaRepository.categoriaModel.findById(categoriaId);

			return categoria;
		} catch (error) {
			this.logger.error(`error: ${JSON.stringify(error.message)}`);
			throw new RpcException(error.message);
		}
	}

	public async buscarTodasAsCategorias(): Promise<Categoria[]> {
		try {
			const categorias = await this.categoriaRepository.categoriaModel.find();

			return categorias;
		} catch (error) {
			this.logger.error(`error: ${JSON.stringify(error.message)}`);
			throw new RpcException(error.message);
		}
	}

	public async atualizarCategoria(
		categoriaId: string,
		atualizarCategoria: AtualizarCategoria,
	): Promise<Categoria> {
		try {
			const categoriaAtualizada = await this.categoriaRepository.categoriaModel.findByIdAndUpdate(
				{
					_id: categoriaId,
				},
				{
					$set: atualizarCategoria,
				},
				{
					new: true,
				},
			);

			return categoriaAtualizada;
		} catch (error) {
			this.logger.error(`error: ${JSON.stringify(error.message)}`);
			throw new RpcException(error.message);
		}
	}
}
