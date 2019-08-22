import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      reward_id: event.pathParameters.reward_id,
      created_at: parseInt(event.pathParameters.created_at,10)
    }
  };
  const userId = event.requestContext ? (event.requestContext.identity ? event.requestContext.identity.cognitoIdentityId : null) : null;
  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      const modifiedItem = {...result.Item};
      modifiedItem.is_redeemed = result['Item']['redemption_history'][userId] != null;
      if (modifiedItem.is_redeemed) {
        const redemptionHistories = result['Item']['redemption_history'][userId];
        modifiedItem.redemption_expired_time = redemptionHistories[redemptionHistories.length - 1] + (3600 * 1000);
      } else {
        delete modifiedItem.reward_qr;
        delete modifiedItem.reward_code;
      }
      delete modifiedItem.redemption_history;
      return success(modifiedItem);
    } else {
      return failure({ status: false, error: "item not found" });
    }
  } catch (e) {
    console.log(e);
    return failure({ status: false, error: e.message });
  }
}
