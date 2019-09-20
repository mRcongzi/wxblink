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
}

export {ClassicModel}