import * as cdk from 'aws-cdk-lib';
import { IDistribution } from 'aws-cdk-lib/aws-cloudfront';

export interface Config {
  distributionIdList: IDistribution['distributionId'][];
  cdkStackProps: cdk.StackProps;
}

export const tags = {
  'ddias-dev:team': 'platform',
  'ddias-dev:project': 'log-forwarder'
};
