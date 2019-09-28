import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP{
  getLatest(sCallback){
    this.request({
      url: 'classic/latest',
      success: (data) => {
        sCallback(data)
      }
    })
  }

  getPrevious(index, sCallback){
    this.request({
      url : 'classic/' + index + '/previous',
      success: (res) => {
        sCallback(res)
      }
    })
  }
}

export {ClassicModel}