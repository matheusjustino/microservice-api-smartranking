import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AppConfigService } from './app-config/app-config.service';

const logger = new Logger('MAIN-MICRO-ADMIN');
const configService = new ConfigService();
const appConfigService = new AppConfigService(configService);

async function bootstrap() {
	logger.log('Iniciando Microserviço MICRO-ADMIN');

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.RMQ,
		options: {
			urls: [appConfigService.amqpUrl],
			queue: appConfigService.queue,
			queueOptions: {
				durable: false,
			},
		},
	});
	app.listen(() => logger.log('Nestjs-Micro-Admin-RBMQ Microservice is listening'));
}
bootstrap();
