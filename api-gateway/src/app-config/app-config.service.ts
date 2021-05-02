import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
	constructor(private readonly configService: ConfigService) {}

	public get amqpUrl(): string {
		return this.configService.get<string>('AMQP_URL');
	}

	public get microAdminQueue(): string {
		return this.configService.get<string>('MICRO_ADMIN_QUEUE');
	}

	public get microDesafiosQueue(): string {
		return this.configService.get<string>('MICRO_DESAFIOS_QUEUE');
	}

	public get s3IdAccessKey(): string {
		return this.configService.get<string>('S3_ID_ACCESS_KEY');
	}

	public get s3PrivateAccessKey(): string {
		return this.configService.get<string>('S3_PRIVATE_ACCESS_KEY');
	}

	public get s3Region(): string {
		return this.configService.get<string>('S3_REGION');
	}

	public get s3BucketName(): string {
		return this.configService.get<string>('S3_BUCKET_NAME');
	}
}
