import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import * as momentTimezone from 'moment-timezone';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api/v1');
	app.useGlobalInterceptors(
		new LoggingInterceptor(),
		new TimeoutInterceptor(),
	);
	app.useGlobalFilters(new HttpExceptionFilter());

	Date.prototype.toJSON = function (): any {
		return momentTimezone(this)
			.tz('America/Sao_Paulo')
			.format('YYYY-MM-DD HH:mm:ss.SSSS');
	};

	await app.listen(8080);
}
bootstrap();
