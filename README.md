# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## deployment instructions
1) Before trying to run the project, it is necessary to create an account in the AWS control panel, create an IAM user and configure it in the Amazon CLI, it is also necessary to have previously installed the Serverless Framework on your machine.
2) Then you can run the `npm install` command to install all project dependencies.
3) Run `serverless deploy` to push the lambdas functions to AWS.
4) Finally, to have access to all the features available in the API, just download the file located at `_data/workspace-aws-cognito-example.json` and import it into Insomnia.