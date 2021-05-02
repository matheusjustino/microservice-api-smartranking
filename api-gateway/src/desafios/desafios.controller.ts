import {
	Controller,
	Logger,
	Inject,
	UsePipes,
	ValidationPipe,
	Post,
	Body,
	Param,
	Get,
	Query,
	Put,
	Delete,
} from '@nestjs/common';

// SERVICES
import { DesafiosService } from './desafios.service';

// PIPES
import { DesafioStatusValidacaoPipe } from '../pipes/desafio-status-validation.pipe';

// DTO's
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';

@Controller('desafios')
export class DesafiosController {
	private logger = new Logger(`API-GATEWAY: ${DesafiosController.name}`);

	constructor(private readonly desafiosService: DesafiosService) {}

	@Post()
	@UsePipes(ValidationPipe)
	public async criarDesafio(@Body() criarDesafioDto: CriarDesafioDto) {
		return await this.desafiosService.criarDesafio(criarDesafioDto);
	}

	// @Post(':desafioId/partida')
	// @UsePipes(ValidationPipe)
	// public async atribuirDesafioPartida(
	// 	@Body(ValidationPipe)
	// 	atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
	// 	@Param('desafioId') desafioId: string,
	// ) {
	// 	this.logger.log(
	// 		`Atribuindo desafio de ID: ${desafioId} a uma partida. DTO: ${JSON.stringify(
	// 			atribuirDesafioPartidaDto,
	// 		)}`,
	// 	);

	// 	return this.clientAdminBackend.emit('atribuir-desafio', {
	// 		desafioId,
	// 		atribuirDesafioPartidaDto,
	// 	});
	// }

	// @Get()
	// public async consultarDesafios(@Query('idJogador') idJogador: string) {
	// 	if (idJogador) {
	// 		this.logger.log(
	// 			`Consultar desafios do jogador de ID: ${idJogador}`,
	// 		);

	// 		return this.clientAdminBackend.emit(
	// 			'consultar-desafios-do-jogador',
	// 			idJogador,
	// 		);
	// 	} else {
	// 		this.logger.log(`Consultar desafios`);

	// 		return this.clientAdminBackend.emit('consultar-desafios', null);
	// 	}
	// }

	// @Put(':desafioId')
	// @UsePipes(ValidationPipe)
	// public async atualizarDesafio(
	// 	@Body(DesafioStatusValidacaoPipe)
	// 	atualizarDesafioDto: AtualizarDesafioDto,
	// 	@Param('desafioId') desafioId: string,
	// ) {
	// 	this.logger.log(
	// 		`Atualizar desafio de ID: ${desafioId}. DTO: ${JSON.stringify(
	// 			atualizarDesafioDto,
	// 		)}`,
	// 	);

	// 	return this.clientAdminBackend.emit('atualizar-desafio', {
	// 		desafioId,
	// 		atualizarDesafioDto,
	// 	});
	// }

	// @Delete(':desafioId')
	// public async deletarDesafio(@Param('desafioId') desafioId: string) {
	// 	this.logger.log(`Deletando desafio de ID: ${desafioId}`);

	// 	return this.clientAdminBackend.emit('deletar-desafio', desafioId);
	// }
}
