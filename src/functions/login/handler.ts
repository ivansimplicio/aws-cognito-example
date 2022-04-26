const AWS = require('aws-sdk');
import { badRequest } from './../../libs/helper';
import { formatResponse } from './../../libs/format';
import { validateCredentials } from './../../libs/validate';
import { middyfy } from '@libs/lambda';

const cognito = new AWS.CognitoIdentityServiceProvider();
const login = async (event) => {
  try {
    const { email, password } = event.body;
    validateCredentials(email, password);
    const { user_pool_id, client_id } = process.env;
    const params = {
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: user_pool_id,
      ClientId: client_id,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    };
    const response = await cognito.adminInitiateAuth(params).promise();
    return formatResponse(200, { accessToken: response.AuthenticationResult.IdToken });
  } catch (error) {
    return formatResponse(400, badRequest(error.message));
  }
};

export const main = middyfy(login);
