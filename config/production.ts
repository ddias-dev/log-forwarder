import { Config, tags } from './config';

/**
 * Production Config
 */
export const productionConfig: Config = {
  distributionIdList: ['XXXXXXXXXXXXX', 'XXXXXXXXXXXXX'],
  cdkStackProps: {
    env: {
      account: '000000000000',
      region: 'ap-southeast-2'
    },
    tags
  }
};
