import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "rewards",
    Key: {
      user_id: event.requestContext.identity.cognitoIdentityId,
      reward_id: event.pathParameters.id
    },
    UpdateExpression: "SET is_redeemed = :is_redeemed",
    ExpressionAttributeValues: {
      ":is_redeemed": data.is_redeemed || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
