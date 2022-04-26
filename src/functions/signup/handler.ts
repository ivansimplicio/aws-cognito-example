const AWS = require('aws-sdk');
import { middyfy } from '@libs/lambda';
import { formatResponse } from '../../libs/format';
import { validateCredentials } from '../../libs/validate';
import { badRequest } from '../../libs/helper';

const cognito = new AWS.CognitoIdentityServiceProvider();
const signup = async (event) => {
  try {
    const { email, password } = event.body;
    validateCredentials(email, password);
    const { user_pool_id } = process.env;
    const params = {
      UserPoolId: user_pool_id,
      Username: email,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'email_verified',
          Value: 'true'
        }],
      MessageAction: 'SUPPRESS'
    };
    const response = await cognito.adminCreateUser(params).promise();
    if (response.User) {
      const paramsForSetPass = {
        Password: password,
        UserPoolId: user_pool_id,
        Username: email,
        Permanent: true
      };
      await cognito.adminSetUserPassword(paramsForSetPass).promise();
    }
    const user = {
      email: response.User.Username,
      enable: response.User.Enabled
    };
    return formatResponse(201, { user });
  }catch (error) {
    return formatResponse(400, badRequest(error.message));
  }
};

export const main = middyfy(signup);
