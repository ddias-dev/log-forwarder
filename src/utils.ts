import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
  AwsSdkCall
} from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

/**
 * AWS Custom Resource helper function
 * @param scope The scope in which to define this construct.
 * @param id The scoped construct ID.
 * @param awsSdkCall An AWS SDK call.
 * @returns AWS Custom Resource
 */
export function createCustomResource(
  scope: Construct,
  awsSdkCall: AwsSdkCall,
  id?: string
) {
  return new AwsCustomResource(scope, `${id ?? ''}CustomResource`, {
    onCreate: awsSdkCall,
    onUpdate: awsSdkCall,
    policy: AwsCustomResourcePolicy.fromSdkCalls({
      resources: AwsCustomResourcePolicy.ANY_RESOURCE
    })
  });
}
