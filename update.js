import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      reward_id: event.pathParameters.id
    },
    UpdateExpression: "SET #redemption_history.#user_id = list_append(if_not_exists(#redemption_history.#user_id, :empty_list), :current_time)",
    ExpressionAttributeNames: {
      "#redemption_history": "redemption_history",
      "#user_id": event.requestContext.identity.cognitoIdentityId
    },
    ExpressionAttributeValues: {
      ":current_time": [Date.now()],
      ":empty_list": []
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false, error: e.message });
  }
}
