import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "rewards",
    Key: {
      user_id: event.requestContext.identity.cognitoIdentityId,
      reward_id: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      const newItem = {
        user_id: result.Item.user_id,
        reward_id: result.Item.reward_id,
      };
      return success(newItem);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
