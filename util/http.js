import {config as conf} from '/config.js'

class HTTP{
  request(params){
    if(!params.method){
      params.method = "GET"
    }
    wx.request({
      url: conf.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header:{
        'content-type': 'application/json',
        'appkey': conf.appkey
      },
      success: (res) => {
        let code = res.statusCode;
        if(code.startsWith('2')){

        }else{

        }
      },
      fail: (err) => {

      }
    })
  }
}

export {HTTP}