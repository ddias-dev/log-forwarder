import * as logs from 'aws-cdk-lib/aws-logs';
import { PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { createCustomResource } from 'src/utils';

/**
 * AWS CloudWatch Logs custom resource to create a LogGroup and return the resource.
 */
export class CloudWatchLogs extends Construct {
  private readonly logGroupResource: logs.ILogGroup;

  constructor(scope: Construct, id: string, logGroupName: string) {
    super(scope, id);

    createCustomResource(this, {
      service: 'CloudWatchLogs',
      action: 'createLogGroup',
      parameters: {
        logGroupName
      },
      ignoreErrorCodesMatching: 'ResourceAlreadyExistsException',
      physicalResourceId: PhysicalResourceId.of(logGroupName)
    });

    this.logGroupResource = logs.LogGroup.fromLogGroupName(
      this,
      'GetResourceAfter',
      logGroupName
    );
  }

  get logGroup() {
    return this.logGroupResource;
  }
}
