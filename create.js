import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      reward_id: uuid.v1(),
      reward_code: data.reward_code,
      reward_qr: data.reward_qr,
      image: data.image,
      title: data.title,
      subtitle: data.subtitle,
      vendor_name: data.vendor_name,
      vendor_image: data.vendor_image,
      vendor_website: data.vendor_website,
      vendor_location: data.vendor_location,
      redemption_type: data.redemption_type,
      redemption_period: data.redemption_period,
      faqs: data.faqs,
      flash_sale_date: data.flash_sale_date,
      expiry_date: data.expiry_date,
      redemption_history: {},
      created_at: Date.now()
    }
  };
  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false, error: e.message});
  }
}
