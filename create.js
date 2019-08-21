import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


  // bannerImageSource: "https://picsum.photos/1000/700",
  // bannerImageAlt: "Subdue had female winged hath, seed night moveth. Replenish winged.",
  // bannerLabelTitle: "Flash Sales",
  // avatarImageSource: "https://picsum.photos/100/100",
  // avatarImageAlt: "avatar alt",
  // avatarTitle: "Coca Cola",
  // avatarSubtitle: "Redeem at Participating Store",
  // title: "Subdue had female winged hath, seed night moveth. Replenish winged.",
  // subtitle: "Enjoy Subdue had female winged hath, seed night moveth. Replenish winged. Only RM 99 per Item!",
  // redemptionPeriod: "9 - 12 October 2019",
  // website: "kucingterbang.com",
  // location: "kucing",
  // faqs: ["a","b","c"],

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      reward_id: uuid.v1(),
      image: data.image,
      title: data.title,
      subtitle: data.subtitle,
      vendor_name: data.vendor.vendor_name,
      vendor_image: data.vendor.vendor_image,
      vendor_website: data.vendor.vendor_website,
      vendor_location: data.vendor.vendor_location,
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
    return failure({ status: false, error: e.message});
  }
}
