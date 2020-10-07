// 引入config文件，公共的接口
import { config } from '../config/config'

// 接口的错误提示码
const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {
  request({ url, data = {}, method = "GET" }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  };

  _request(url, resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: config.url + url,
      method: 'GET',
      data: data,
      header: {
        "content-type": "application/json",
        // "appKey" : config.appkey   //接口需要传值的话，再传
      },
      success: (response) => {
        const code = response.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(response);
        } else {
          reject();
          const error_code = response.data.error_code //1005
          this._show.error(error_code)
        }
      },
      fail: function (error) {
        reject(error)
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    //1005
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP }
