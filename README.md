# Reward APP API

This project is bootstrapped using
[Serverless Node.js Starter](https://github.com/AnomalyInnovations/serverless-nodejs-starter) which uses the [serverless-bundle](https://github.com/AnomalyInnovations/serverless-bundle) plugin (an extension of the [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack) plugin) and the [serverless-offline](https://github.com/dherault/serverless-offline) plugin.

### About
This project is an attempt to use serverless framework in order for the developer to focus only to the functions that they created and don't have to actively manage the scaling for the applications.

The architecture is based on this [link](https://aws.amazon.com/serverless/)
The functions of this repo will be uploaded to s3 as a zip to manage the version and the compiled version is created in Lambda.
The front-end will trigger api gateway which will invoke the function, and the function will use the resource needed to fullfill it such as AWS DynamoDb to get data from precreated table or S3 to upload or get Attachment.
Every error will be `Logged` in `CloudWatch`

The infrastructure is set up in `serverless.yml` which uses resource file that sets up each resource:

*  `cognito-identity-pool.yml` : set up and create federated identity pool based on environment and manage identity pool roles which roles is also described as an IAM role in this file
*  `cognito-user-pool.yml` : set up and create user pool based on environment
*  `dynamodb-table.yml` : set up table schema and create dynamodb table based on environment
*  `s3-bucket.yml` : set up and create s3-bucket based on environment and manage the policy
*  `api-gateway-errors.yml` : manage api gateway errors

### APIs
#### GET REWARD
`GET rewards/{reward_id}/{created_at}`

Get a reward item from rewards table
`side effect` :
* hides `reward_code` and `reward_qr` when reward is not redeemed
* if user has redeemed the reward, `is_redeemed` and `redemption_expired_time` is created based on `redemption_history`
* always hides `redemption_history` 

#### CREATE REWARD 
`POST rewards/`
Create a reward item based on parameters
`side effect` :
* add `reward_id` generated from `UUID.v1()`
* add `created_at` generated from `Date.now()`


### UPDATE REWARD *name should be REDEEM REWARD
`PUT rewards/{reward_id}/{created_at}`
Redeem a reward

`side effect` :
* add `{user_id}` with value `Date.now()` in redemption_history

### DELETE REWARD
`DELETE rewards/{reward_id}/{created_at}`
delete a reward

### GET LIST OF REWARDS
`GET rewards/`
get list of all rewards

### Usage

To run a function on local

``` bash
$ serverless invoke local --function hello
```

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ serverless offline start
```

Deploy project

``` bash
$ serverless deploy
```

Deploy a single function

``` bash
$ serverless deploy function --function hello
```

#### Running Tests

Run your tests using

``` bash
$ npm test
```

### Further Development
*  Paginate request for get-list so that the result is not the whole table
*  Add more unit test and add more integration test


