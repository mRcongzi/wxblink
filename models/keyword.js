
class KeyWordModel{
  key = q
  maxLength = 10

  getHistory(){
    const words = wx.getStorageInfoSync(this.key)
    if(!words){
      return []
    }
    return words
  }

  getHot(){

  }

  addToHistory(keyword){
    let words = this.getHistory()
    const has = words.includes(keyword)
    if(!has){
      if(words.length > this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, value)
    }
  }
}