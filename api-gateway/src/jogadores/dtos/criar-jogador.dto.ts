import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CriarJogadorDto {
	@IsNotEmpty()
	@IsString()
	public readonly telefoneCelular: string;

	@IsNotEmpty()
	@IsEmail()
	public readonly email: string;

	@IsNotEmpty()
	@IsString()
	public readonly nome: string;

	@IsNotEmpty()
	public readonly categoria: string;
}
