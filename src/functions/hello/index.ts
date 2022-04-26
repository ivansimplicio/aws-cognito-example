import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        cors: true,
        authorizer: {
          name: "CognitoAuthorizer",
          type: "COGNITO_USER_POOLS",
          arn: {
            "Fn::GetAtt": [
              "UserPool",
              "Arn"
            ]
          },
          claims: [
            "email"
          ]
        }
      },
    },
  ],
};
