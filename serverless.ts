import type { AWS } from '@serverless/typescript';

import signup from '@functions/signup';
import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'aws-cognito-example',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      user_pool_id: {
        Ref: "UserPool"
      },
      client_id: {
        Ref: "UserClient"
      },
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "cognito-idp:AdminInitiateAuth",
          "cognito-idp:AdminCreateUser",
          "cognito-idp:AdminSetUserPassword"
        ],
        Resource: [
          "*"
        ]
      }
    ],
  },
  // import the function via paths
  functions: { signup, hello },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      UserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          UserPoolName: "aws-cognito-example-pool",
          Schema: [
            {
              Name: "email",
              Required: true,
              Mutable: true
            }
          ],
          Policies: {
            PasswordPolicy: {
              MinimumLength: 8
            }
          },
          AutoVerifiedAttributes: [
            "email"
          ]
        }
      },
      UserClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
          ClientName: "user-pool-ui",
          GenerateSecret: false,
          UserPoolId: {
            Ref: "UserPool"
          },
          AccessTokenValidity: 5,
          IdTokenValidity: 5,
          ExplicitAuthFlows: [
            "ADMIN_NO_SRP_AUTH"
          ]
        }
      }
    }
  },
};

module.exports = serverlessConfiguration;
