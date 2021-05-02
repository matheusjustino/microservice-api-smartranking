import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';

// MODULE
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
	imports: [AppConfigModule],
	providers: [AwsService],
	exports: [AwsService],
})
export class AwsModule {}
