import { formatResponse } from './../../libs/format';
import { middyfy } from '@libs/lambda';

const welcome = async (_event) => {
  const message = `Welcome to Serverless!`;
  return formatResponse(200, { message })
};

export const main = middyfy(welcome);
