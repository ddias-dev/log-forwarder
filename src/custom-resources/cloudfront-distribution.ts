import * as cdk from 'aws-cdk-lib';
import {
  AwsCustomResource,
  PhysicalResourceId
} from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { createCustomResource } from 'src/utils';

/**
 * AWS CloudFront Distribution custom resources to get Logging Bucket information.
 */
export class CloudFrontDistribution extends Construct {
  private readonly resource: AwsCustomResource;

  constructor(scope: Construct, id: string, distributionId: string) {
    super(scope, id);

    // Define a custom resource
    this.resource = createCustomResource(this, {
      service: 'CloudFront',
      action: 'getDistributionConfig',
      parameters: {
        Id: distributionId
      },
      outputPaths: ['DistributionConfig.Logging'],
      physicalResourceId: PhysicalResourceId.of(distributionId)
    });
  }

  get loggingBucket(): string {
    return cdk.Fn.select(
      0,
      cdk.Fn.split(
        '.',
        this.resource.getResponseField('DistributionConfig.Logging.Bucket')
      )
    );
  }

  get loggingBucketPrefix(): string {
    return this.resource.getResponseField('DistributionConfig.Logging.Prefix');
  }
}
