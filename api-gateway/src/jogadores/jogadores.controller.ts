import {
	Controller,
	Get,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	Param,
	Put,
	Delete,
	Query,
	UseInterceptors,
	UploadedFile,
	BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// PIPES
import { JogadoresValidacaoParametrosPipe } from '../pipes/jogadores-validacao-parametros.pipe';

// DTOS
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

// SERVICES
import { JogadoresService } from './jogadores.service';
import { AwsService } from '../aws/aws.service';

@Controller('jogadores')
export class JogadorController {
	constructor(
		private readonly jogadoresService: JogadoresService,
		private readonly awsService: AwsService,
	) {}

	@Post()
	@UsePipes(ValidationPipe)
	public criarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
		return this.jogadoresService.criarJogador(criarJogadorDto);
	}

	@Get()
	public consultarJogadores() {
		return this.jogadoresService.consultarJogadores();
	}

	@Get(':id')
	public consultarJogador(
		@Param('id', JogadoresValidacaoParametrosPipe) id: string,
	) {
		return this.jogadoresService.consultarJogador(id);
	}

	@Put(':id')
	@UsePipes(ValidationPipe)
	public atualizarJogador(
		@Param('id', JogadoresValidacaoParametrosPipe) id: string,
		@Body() atualizarJogador: AtualizarJogadorDto,
	) {
		return this.jogadoresService.atualizarJogador(id, atualizarJogador);
	}

	@Delete()
	public deletarJogador(
		@Query('email', JogadoresValidacaoParametrosPipe) email: string,
	) {
		return this.jogadoresService.deletarJogador(email);
	}

	@Post(':id/upload')
	@UseInterceptors(FileInterceptor('file'))
	public async uploadArquivo(
		@UploadedFile() file,
		@Param('id') jogadorId: string,
	) {
		const jogador = await this.jogadoresService
			.consultarJogador(jogadorId)
			.toPromise();
		if (!jogador) {
			throw new BadRequestException('Jogador não cadastrado');
		}

		const urlFotoJogador = await this.awsService.uploadArquivo(
			file,
			jogadorId,
		);
		const atualizarJogadorDto: AtualizarJogadorDto = {
			urlFotoJogador: urlFotoJogador.urlArquivo,
		};
		await this.jogadoresService.atualizarJogador(
			jogadorId,
			atualizarJogadorDto,
		);

		return this.jogadoresService.consultarJogador(jogadorId);
	}
}
