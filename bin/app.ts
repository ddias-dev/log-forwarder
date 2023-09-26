import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import { map } from 'lodash';
import { getConfig } from '../config';
import { LogForwarderStack } from '../src/log-forwarder';

const app = new cdk.App();

const config = getConfig();

map(config.distributionIdList, (distributionId) => {
  new LogForwarderStack(app, `log-forwarder-cf-${distributionId}`, {
    cdkStackProps: config.cdkStackProps,
    distributionId
  });
});
