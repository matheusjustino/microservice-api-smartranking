import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

// SERVICES
import { CategoriaService } from './categoria.service';

// INTERFACES
import { Categoria } from '../database/interfaces/categorias/categoria.interface';
import { AtualizarCategoria } from '../interfaces/categoria/atualizar-categoria.interface';

@Controller('categorias')
export class CategoriaController {
	private readonly logger = new Logger(CategoriaController.name);

	constructor(private readonly categoriaService: CategoriaService) {}

	@EventPattern('criar-categoria')
	public async criarCategoria(categoria: Categoria) {
		this.logger.log(`(criar-categoria) Payload: ${JSON.stringify(categoria)}`);

		const categoriaCriada = await this.categoriaService.criarCategoria(categoria);

		return categoriaCriada;
	}

	@MessagePattern('consultar-categorias-por-id')
	public async consultarCategoriaPeloId(categoriaId: string) {
		this.logger.log(`(consultar-categorias-por-id) Payload: ${JSON.stringify(categoriaId)}`);

		const categoria = await this.categoriaService.buscarCategoriaPeloId(categoriaId);

		return categoria;
	}

	@MessagePattern('consultar-categorias')
	public async consultarTodasAsCategorias() {
		this.logger.log(`(consultar-categorias)`);

		const categoria = await this.categoriaService.buscarTodasAsCategorias();

		return categoria;
	}

	@EventPattern('atualizar-categoria')
	public async atualizarCategoria(data: {
		categoriaId: string;
		atualizarCategoria: AtualizarCategoria;
	}) {
		this.logger.log(`(atualizar-categorias) Payload: ${JSON.stringify(data)}`);

		const categoriaAtualizada = await this.categoriaService.atualizarCategoria(
			data.categoriaId,
			data.atualizarCategoria,
		);

		return categoriaAtualizada;
	}
}
