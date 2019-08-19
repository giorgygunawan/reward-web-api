import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "rewards",
    Item: {
      reward_id: uuid.v1(),
      image: data.image,
      title: data.title,
      vendor_name: data.vendor.vendor_name,
      vendor_image: data.vendor.vendor_image,
      user_type: data.user_type,
      type: data.redemption_type,
      flash_sale_begin: data.flash_sale_begin,
      flash_sale_end: data.flash_sale_end,
      redemption_history: {},
      createdAt: Date.now()
    }
  };
  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
