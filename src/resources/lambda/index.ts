import { Rule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { join } from 'path';

/**
 * Lambda Function resource that will be responsible to stream the logs to AWS CloudWatch Logs.
 */
export class Lambda extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: {
      loggingBucket: string;
      loggingBucketPrefix: string;
      logGroupName: string;
    }
  ) {
    super(scope, id);

    // Get Logging S3 Bucket resource
    const loggingBucket = Bucket.fromBucketName(
      this,
      'LoggingBucket',
      props.loggingBucket
    );

    // Create Lambda to CloudWatch IAM Role
    const role = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      inlinePolicies: {
        root: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: ['s3:GetObject'],
              resources: [
                `${loggingBucket.bucketArn}/${props.loggingBucketPrefix}*`
              ]
            }),
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents'
              ],
              resources: ['arn:aws:logs:*:*:*']
            })
          ]
        })
      }
    });

    // Create Lambda Function and attach IAM Role and handler
    const lambdaFn = new lambda.Function(this, 'Function', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromAsset(join(__dirname, 'handler')),
      role,
      environment: {
        LOG_GROUP_NAME: props.logGroupName
      },
      description:
        'Lambda Function which takes CloudFront logs from S3, and writes them to a CloudWatch Log group defined in env variables.'
    });

    // Add permission to S3 Bucket invoke the lambda function
    lambdaFn.addPermission('InvokePermission', {
      principal: new iam.ServicePrincipal('s3.amazonaws.com'),
      action: 'lambda:InvokeFunction',
      sourceArn: loggingBucket.bucketArn
    });

    // Enable EventBridge on S3 Bucket
    loggingBucket.enableEventBridgeNotification();

    // Create EventBridge Rule for notification between S3 Bucket & Lambda Function
    new Rule(this, 'EventBridgeRule', {
      eventPattern: {
        source: ['aws.s3'],
        detail: {
          bucket: { name: [props.loggingBucket] },
          object: { key: [{ prefix: props.loggingBucketPrefix }] }
        },
        detailType: ['Object Created']
      },
      targets: [new LambdaFunction(lambdaFn)]
    });
  }
}
