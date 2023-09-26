import { Config, tags } from './config';

/**
 * Development Config
 */
export const developmentConfig: Config = {
  distributionIdList: ['XXXXXXXXXXXXX', 'XXXXXXXXXXXXX'],
  cdkStackProps: {
    env: {
      account: '000000000000',
      region: 'ap-southeast-2'
    },
    tags
  }
};
