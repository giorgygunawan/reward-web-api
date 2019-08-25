test('successfully create reward', async () => {
  jest.mock('../libs/dynamodb-lib')
  const create = require('../create');
  const createRewardMock = require('../mocks/create-reward.json');
  const event = createRewardMock;
  const context = 'context';
  const completeResult = await create.main(event, context);
  const expectedResult = {
      reward_id: "cf07a670-c3db-11e9-8ee1-4d9419018a6e",
      reward_code: "EXAMPLECODE99",
      reward_qr: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example",
      image: "https://picsum.photos/500/300",
      title: "default title",
      vendor_name: "Coca Cola",
      vendor_image: "https://picsum.photos/90/90",
      vendor_website: "www.vendor.com",
      vendor_location: "egypt",
      redemption_type: "redeem at online store",
      redemption_period: "12 - 20 October 2019",
    };
  const result = JSON.parse(completeResult.body);
  expect(completeResult.statusCode).toEqual(200);
  expect(result.reward_id).not.toBeNull();
  expect(result.reward_code).toEqual(expectedResult.reward_code);
  expect(result.reward_qr).toEqual(expectedResult.reward_qr);
  expect(result.image).toEqual(expectedResult.image);
  expect(result.title).toEqual(expectedResult.title);
  expect(result.vendor_name).toEqual(expectedResult.vendor_name);
  expect(result.vendor_website).toEqual(expectedResult.vendor_website);
  expect(result.vendor_location).toEqual(expectedResult.vendor_location);
  expect(result.redemption_type).toEqual(expectedResult.redemption_type);
  expect(result.redemption_period).toEqual(expectedResult.redemption_period);
});
