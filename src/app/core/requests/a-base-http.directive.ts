import { ConfigService } from '@core';

export abstract class ABaseHttpService {
  apiURL: string = '';
  controllerName: string = '';
  constructor(protected configService: ConfigService) {
    this.apiURL = configService.getValue<string>('config', 'apiURL')!;
  }

  getApiURL(): string {
    return this.configService.getValue<string>('config', 'apiURL')!;
  }
}
