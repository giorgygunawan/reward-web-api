import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    ProjectionExpression: "reward_id,image,title,vendor_name,vendor_image,redemption_type,flash_sale_date,expiry_date,created_at"
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false, error: e.message });
  }
}
