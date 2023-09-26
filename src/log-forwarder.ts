import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as customResource from './custom-resources';
import * as resources from './resources';

// TODO
// ☑ 1. Get S3 Bucket Name and Prefix from each CloudFront Distribution standard logs
// ☑ 2. Create CloudWatch Log Group for each CloudFront Distribution
// ☑ 3. Create IAM Role for Lambda execution to forward logs from s3
// ☐ 4. Convert Lambda Handler from Python to Node.js
// ☑ 5. Create Lambda Function resource to each CloudFront Distribution
// ☑ 6. Attach the Lambda Handler to each Lambda Function
// ☑ 7. Set the IAM Role to each Lambda Function
// ☑ 8. Create EventBridge Rule for notification between S3 Bucket and Lambda Function

/**
 * Forward the AWS CloudFront standard logs that are stored in S3 into AWS CloudWatch Logs.
 */
export class LogForwarderStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: { cdkStackProps: cdk.StackProps; distributionId: string }
  ) {
    super(scope, id, props.cdkStackProps);

    // Get CloudFront Logging Configuration
    const { loggingBucket, loggingBucketPrefix } =
      new customResource.CloudFrontDistribution(
        this,
        'CloudFront',
        props.distributionId
      );

    // Create or Get Log Group if exist
    const logGroupName = new customResource.CloudWatchLogs(
      this,
      'LogGroup',
      `cloudfront/${props.distributionId}`
    ).logGroup.logGroupName;

    // Create Lambda Function to stream the logs to CloudWatch
    new resources.Lambda(this, 'Lambda', {
      loggingBucket,
      loggingBucketPrefix,
      logGroupName
    });
  }
}
