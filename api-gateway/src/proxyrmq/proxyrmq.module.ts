import { Module } from '@nestjs/common';

// MODULES
import { AppConfigModule } from '../app-config/app-config.module';

// RMQ PROXY
import { ClientProxySmartRanking } from './client-proxy';

@Module({
	imports: [AppConfigModule],
	providers: [ClientProxySmartRanking],
	exports: [ClientProxySmartRanking],
})
export class ProxyRmqModule {}
