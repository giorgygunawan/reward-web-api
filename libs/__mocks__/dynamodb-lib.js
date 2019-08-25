import rewards from './model'

export function call(action, params) {
    if(action == 'get') {
      const response = {};
      rewards.forEach((value) => {
        if(value.reward_id === params.Key.reward_id && value.created_at === params.Key.created_at) {
          response.Item = value;
        }
      });
      return response;
    } else if(action == 'put') {
      const item = params.Item
      if(item.reward_id == null) {
        throw Error('reward_id is null');
      } else {
        if(typeof item.reward_id !== "string") {
          throw Error('reward_id type supposed to be string');
        } else {

        }
      }

      if(item.reward_code == null) {
        throw Error('reward_code is null');
      } else {
        if(typeof item.reward_code !== "string") {
          throw Error('reward_code type supposed to be string');
        } else {

        }
      }

      if(item.reward_qr == null) {
        throw Error('reward_qr is null');
      } else {
        if(typeof item.reward_qr !== "string") {
          throw Error('reward_qr type supposed to be string');
        } else {

        }
      }

      if(item.image == null) {
        throw Error('image is null');
      } else {
        if(typeof item.image !== "string") {
          throw Error('image type supposed to be string');
        } else {

        }
      }

      if(item.title == null) {
        throw Error('title is null');
      } else {
        if(typeof item.title !== "string") {
          throw Error('title type supposed to be string');
        } else {

        }
      }

      if(item.subtitle == null) {
        throw Error('subtitle is null');
      } else {
        if(typeof item.subtitle !== "string") {
          throw Error('subtitle type supposed to be string');
        } else {

        }
      }

      if(item.vendor_name == null) {
        throw Error('vendor_name is null');
      } else {
        if(typeof item.vendor_name !== "string") {
          throw Error('vendor_name type supposed to be string');
        } else {

        }
      }

      if(item.vendor_image == null) {
        throw Error('vendor_image is null');
      } else {
        if(typeof item.vendor_image !== "string") {
          throw Error('vendor_image type supposed to be string');
        } else {

        }
      }

      if(item.vendor_website == null) {
        throw Error('vendor_website is null');
      } else {
        if(typeof item.vendor_website !== "string") {
          throw Error('vendor_image type supposed to be string');
        } else {

        }
      }

      if(item.vendor_location == null) {
        throw Error('vendor_location is null');
      } else {
        if(typeof item.vendor_location !== "string") {
          throw Error('vendor_location type supposed to be string');
        } else {

        }
      }

      if(item.redemption_type == null) {
        throw Error('redemption_type is null');
      } else {
        if(typeof item.redemption_type !== "string") {
          throw Error('redemption_type type supposed to be string');
        } else {

        }
      }

      if(item.faqs == null) {
        throw Error('faqs is null');
      } else {
        if(!Array.isArray(item.faqs)) {
          throw Error('faqs type supposed to be array');
        } else {

        }
      }

      if(item.flash_sale_date == null) {
        throw Error('flash_sale_date is null');
      } else {
        if(typeof item.flash_sale_date !== "string") {
          throw Error('flash_sale_date type supposed to be string');
        } else {

        }
      }

      if(item.expiry_date == null) {
        throw Error('expiry_date is null');
      } else {
        if(typeof item.expiry_date !== "string") {
          throw Error('expiry_date type supposed to be string');
        } else {

        }
      }

      if(item.redemption_history == null) {
        throw Error('redemption_history is null');
      } else {

      }

      if(item.created_at == null) {
        throw Error('create_at is null');
      } else {
        if(typeof item.created_at !== "number") {
          throw Error('create_at type supposed to be number');
        } else {

        }
      }
      return item;
    } else if(action == 'update') {

    } else if(action == 'scan') {

    } else if(action == 'delete') {

    }
}
