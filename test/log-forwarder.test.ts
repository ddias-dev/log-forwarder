import { SynthUtils } from '@aws-cdk/assert';
import { App } from 'aws-cdk-lib';

import { developmentConfig } from 'config/development';
import { productionConfig } from 'config/production';
import { LogForwarderStack } from 'src/log-forwarder';

describe('Snapshot Log Forwarder Stack', () => {
  describe.each([developmentConfig, productionConfig])(
    'By Distribution',
    (config) => {
      test.each(config.distributionIdList)('%s', (distributionId) => {
        const app = new App();

        const id = `log-forwarder-cd-${distributionId}`;

        const stack = new LogForwarderStack(app, id, {
          cdkStackProps: config.cdkStackProps,
          distributionId
        });

        const template = SynthUtils.toCloudFormation(stack);

        expect(template).toMatchSnapshot(id);
      });
    }
  );
});
