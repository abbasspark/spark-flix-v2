import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig } from './IConfig.interface';

@Injectable()
export class BaseConfig extends ConfigService<IConfig> {}
