import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AtualizarJogadorDto {
	@IsString()
	@IsOptional()
	public telefoneCelular?: string;

	@IsString()
	@IsOptional()
	public nome?: string;

	@IsString()
	@IsOptional()
	public categoria?: string;

	@IsString()
	@IsOptional()
	public urlFotoJogador?: string;
}
