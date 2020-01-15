// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords: [],
    dataArray: [],
    searching: false,
    searchWord: ""
  },

  // 组件激活时调用的方法
  attached(){
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res=>{
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event){
      this.triggerEvent("cancel", {}, {})
    },

    onConfirm(event){
      const word = event.detail.value || event.detail.text
      this.setData({
        searching: true,
        searchWord: word
      })
      bookModel.search(0, word).then(res=>{
        this.setData({
          dataArray: res.books,
        })
        keywordModel.addToHistory(word)
      })
    },

    onDelete(event){
      this.setData({
        searching: false,
        searchWord: ""
      })
    }
  }
})
