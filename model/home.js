import { HTTP } from "../utils/request"

class home extends HTTP {
  //扫码获取商品信息
  getsao(qcode) {
    return this.request({
      url: '/api/getProduct',
      data: {
        qcode: qcode
      }
    })
  }

}

export { home }