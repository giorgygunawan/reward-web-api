test('successfully get reward by id user has not redeemed reward', async () => {
  jest.mock('../libs/dynamodb-lib')
  const get = require('../get');
  const getRewardMock = require('../mocks/get-reward.json');
  const event = getRewardMock;
  const context = 'context';
  const completeResult = await get.main(event, context);
  const expectedResult = {
      reward_id: "cf07a670-c3db-11e9-8ee1-4d9419018a6e",
      reward_code: "TESTREWARD",
      reward_qr: "TESTQR",
      image: "https://picsum.photos/500/300",
      title: "Subdue had female winged hath, seed night moveth. Replenish winged.",
      vendor_name: "Coca Cola",
      vendor_image: "https://picsum.photos/90/90",
      vendor_website: "www.website.com",
      vendor_location: "Jakarta",
      redemption_type: "redeem online",
      redemption_period: "12 - 19 October 2019",
      faqs: ["1","2"],
      flash_sale_date: 1565944466,
      redemption_history: {
        "us-east-1:c8c984bf-4939-4210-a75d-edd0b85e2fa1" : ["1565944466", "1565948066"],
        "TEST-123456" : ["1565944466"]
      },
      created_at: 1566368445016,
      expiry_date: 1566368445016
    };
  const result = JSON.parse(completeResult.body);
  expect(result.reward_id).toEqual(expectedResult.reward_id);
  expect(result.reward_code).toBeUndefined();
  expect(result.reward_qr).toBeUndefined();
  expect(result.image).toEqual(expectedResult.image);
  expect(result.title).toEqual(expectedResult.title);
  expect(result.vendor_name).toEqual(expectedResult.vendor_name);
  expect(result.vendor_website).toEqual(expectedResult.vendor_website);
  expect(result.vendor_location).toEqual(expectedResult.vendor_location);
  expect(result.redemption_type).toEqual(expectedResult.redemption_type);
  expect(result.redemption_period).toEqual(expectedResult.redemption_period);
  expect(result.faqs).toEqual(expectedResult.faqs);
  expect(result.flash_sale_date).toEqual(expectedResult.flash_sale_date);
  expect(result.redemption_history).toBeUndefined();
  expect(result.created_at).toEqual(expectedResult.created_at);
  expect(result.expiry_date).toEqual(expectedResult.expiry_date);
  expect(result.is_redeemed).toEqual(false);
});

test('successfully get reward by id user has redeemed reward', async () => {
  jest.mock('../libs/dynamodb-lib')
  const get = require('../get');
  const getRewardMock = require('../mocks/get-redeemed-reward.json');
  const event = getRewardMock;
  const context = 'context';
  const completeResult = await get.main(event, context);
  const expectedResult = {
      reward_id: "cf07a670-c3db-11e9-8ee1-4d9419018a6e",
      reward_code: "TESTREWARD",
      reward_qr: "TESTQR",
      image: "https://picsum.photos/500/300",
      title: "Subdue had female winged hath, seed night moveth. Replenish winged.",
      vendor_name: "Coca Cola",
      vendor_image: "https://picsum.photos/90/90",
      vendor_website: "www.website.com",
      vendor_location: "Jakarta",
      redemption_type: "redeem online",
      redemption_period: "12 - 19 October 2019",
      faqs: ["1","2"],
      flash_sale_date: 1565944466,
      redemption_history: {
        "us-east-1:c8c984bf-4939-4210-a75d-edd0b85e2fa1" : ["1565944466", "1565948066"],
        "TEST-123456" : ["1565944466"]
      },
      created_at: 1566368445016,
      expiry_date: 1566368445016
    };
  const result = JSON.parse(completeResult.body);
  expect(result.reward_id).toEqual(expectedResult.reward_id);
  expect(result.reward_code).toEqual(expectedResult.reward_code);
  expect(result.reward_qr).toEqual(expectedResult.reward_qr);
  expect(result.image).toEqual(expectedResult.image);
  expect(result.title).toEqual(expectedResult.title);
  expect(result.vendor_name).toEqual(expectedResult.vendor_name);
  expect(result.vendor_website).toEqual(expectedResult.vendor_website);
  expect(result.vendor_location).toEqual(expectedResult.vendor_location);
  expect(result.redemption_type).toEqual(expectedResult.redemption_type);
  expect(result.redemption_period).toEqual(expectedResult.redemption_period);
  expect(result.faqs).toEqual(expectedResult.faqs);
  expect(result.flash_sale_date).toEqual(expectedResult.flash_sale_date);
  expect(result.redemption_history).toBeUndefined();
  expect(result.created_at).toEqual(expectedResult.created_at);
  expect(result.expiry_date).toEqual(expectedResult.expiry_date);
  expect(result.is_redeemed).toEqual(true);
});

test('failed to get reward, item not found', async () => {
  jest.mock('../libs/dynamodb-lib')
  const get = require('../get');
  const getRewardMock = require('../mocks/get-reward-not-found.json');
  const event = getRewardMock;
  const context = 'context';
  const completeResult = await get.main(event, context);
  expect(completeResult.statusCode).toEqual(500);
})
