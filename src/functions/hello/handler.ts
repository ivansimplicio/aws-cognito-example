import { formatResponse } from './../../libs/format';
import { middyfy } from '@libs/lambda';

const hello = async (event) => {
  const email = event.requestContext.authorizer.claims.email;
  const message = `Hello ${email}, welcome to Serverless!`;
  return formatResponse(200, { message })
};

export const main = middyfy(hello);
