import { HTTP } from "../utils/request";

class open extends HTTP {
  getOpen(code) {
    return this.request({
      url: "/weixinpay/login",
      data: {
        code
      }
    })
  }
}

export { open }