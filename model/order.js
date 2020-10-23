import {HTTP} from "../utils/request";

class OrderModel extends HTTP{
  doOrder(data){
    return this.request({
      url : "/weixinpay/doOrder",
      method : "POST",
      data : data
    })
  }
}

export {OrderModel}