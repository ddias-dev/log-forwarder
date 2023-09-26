import { Config } from './config';
import { developmentConfig } from './development';
import { productionConfig } from './production';

export const env = process.env['ENVIRONMENT'];

export function getConfig(): Config {
  switch (env) {
    case 'production':
      return productionConfig;
    case 'development':
      return developmentConfig;
    default:
      throw new Error(`Missing or unsupported ENVIRONMENT: ${env}`);
  }
}
