import { HTTP } from "../utils/request"

class ption extends HTTP {
  //购物车商品
  getption(qcode) {
    return this.request({
      url: '/api/getProduct',
      data: {
        qcode: qcode
      }
    })
  }

}

export { ption }