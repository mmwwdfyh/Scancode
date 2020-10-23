// 引入config文件，公共的接口
import { config } from '../config/config'

// 接口的错误提示码
const tips = {
  1 : "抱歉,出现了一个错误",
  301 : "永久重定向",
  400 : "请求包含不支持的参数",
  401 : "未授权",
  403 : "被禁止访问",
  404 : "请求的资源不存在",
  413 : "上传的File体积太大",
  500 : "内部错误",
  1000 : "输入参数错误",
  1001 : "输入的json格式不正确",
  1002 : "找不到资源",
  1003 : "未知错误",
  1004 : "禁止访问",
  1005 : "不正确的开发者key",
  1006 : "服务器内部错误",
  2000 : "你已经点过赞了",
  2001 : "你还没点过赞",
  3000 : "该期内容不存在"
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
