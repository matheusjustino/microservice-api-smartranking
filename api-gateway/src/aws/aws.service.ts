import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

// SERVICES
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class AwsService {
	private s3AWS: AWS.S3 = null;
	private logger = new Logger(AwsService.name);

	constructor(private readonly appConfigService: AppConfigService) {}

	private get s3Instance() {
		if (this.s3AWS) {
			return this.s3AWS;
		} else {
			this.s3AWS = new AWS.S3({
				region: this.appConfigService.s3Region,
				accessKeyId: this.appConfigService.s3IdAccessKey,
				secretAccessKey: this.appConfigService.s3PrivateAccessKey,
			});

			return this.s3AWS;
		}
	}

	public async uploadArquivo(file: any, jogadorId: string) {
		const s3 = this.s3Instance;
		const [fileName, fileExtension] = file.originalname.split('.');
		const urlKey = `${jogadorId}.${fileExtension}`;

		this.logger.log(`urlKey: ${urlKey}`);

		const params = {
			Body: file.buffer,
			Bucket: this.appConfigService.s3BucketName,
			Key: urlKey,
		};

		const s3Result = s3
			.putObject(params)
			.promise()
			.then(
				(data) => {
					this.logger.log('Arquivo carregado com sucesso');
					const objReturn = {
						urlArquivo: `https://${this.appConfigService.s3BucketName}.s3-${this.appConfigService.s3Region}.amazonaws.com/${urlKey}`,
					};

					return objReturn;
				},
				(error) => {
					this.logger.error(error);
					return error;
				},
			);

		return s3Result;
	}
}
