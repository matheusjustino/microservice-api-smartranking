import { Injectable } from '@nestjs/common';
import {
	ClientProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices';

// SERVICES
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class ClientProxySmartRanking {
	private clientMicroAdminProxy: ClientProxy = null;
	private clientMicroDesafiosProxy: ClientProxy = null;

	constructor(private readonly appConfigService: AppConfigService) {}

	public get microAdminClient(): ClientProxy {
		if (this.clientMicroAdminProxy) {
			return this.clientMicroAdminProxy;
		}

		this.clientMicroAdminProxy = ClientProxyFactory.create({
			transport: Transport.RMQ,
			options: {
				urls: [this.appConfigService.amqpUrl],
				queue: this.appConfigService.microAdminQueue,
				queueOptions: {
					durable: false,
				},
			},
		});

		return this.clientMicroAdminProxy;
	}

	public get microDesafiosClient(): ClientProxy {
		if (this.clientMicroDesafiosProxy) {
			return this.clientMicroDesafiosProxy;
		}

		this.clientMicroDesafiosProxy = ClientProxyFactory.create({
			transport: Transport.RMQ,
			options: {
				urls: [this.appConfigService.amqpUrl],
				queue: this.appConfigService.microDesafiosQueue,
				queueOptions: {
					durable: false,
				},
			},
		});

		return this.clientMicroDesafiosProxy;
	}
}
