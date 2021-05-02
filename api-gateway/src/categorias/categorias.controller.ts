import {
	Controller,
	Get,
	Post,
	UsePipes,
	ValidationPipe,
	Body,
	Param,
	Put,
} from '@nestjs/common';

// DTOS
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

// SERVICES
import { CategoriasService } from './categorias.service';

@Controller('categorias')
export class CategoriasController {
	constructor(private readonly categoriasService: CategoriasService) {}

	@Post()
	@UsePipes(ValidationPipe)
	public criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
		return this.categoriasService.criarCategoria(criarCategoriaDto);
	}

	@Post(':categoria/jogadores/:idJogador')
	public atribuirCategoriaJogador(@Param() params: string[]): void {
		return this.atribuirCategoriaJogador(params);
	}

	@Get()
	public consultarCategorias() {
		return this.categoriasService.consultarCategorias();
	}

	@Get(':categoriaId')
	public consultarCategoriaPeloId(@Param('categoriaId') categoriaId: string) {
		return this.categoriasService.consultarCategoriaPeloId(categoriaId);
	}

	@Put(':categoriaId')
	public atualizarCategoria(
		@Param('categoriaId') categoriaId: string,
		@Body() atualizarCategoria: AtualizarCategoriaDto,
	) {
		return this.categoriasService.atualizarCategoria(
			categoriaId,
			atualizarCategoria,
		);
	}
}
