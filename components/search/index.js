// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
import {paginationBeh} from '../behaviors/pagination.js'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBeh],

  properties: {
    more: {
      type: Boolean,
      observer: 'loadMore',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords: [],
    searching: false,
    searchWord: "",
    loading: false
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
    loadMore(){
      if(!this.data.searchWord | this.data.loading){
        return
      }

      if(this.hasMore()){
        this.data.loading = true
        bookModel.search(this.getCurrentStart(), this.data.searchWord).then(res => {
          this.setMoreData(res.books)
          this.data.loading = false
        })
      }
    },

    onCancel(event){
      this.triggerEvent("cancel", {}, {})
    },

    onConfirm(event){
      const word = event.detail.value || event.detail.text
      this.setData({
        searching: true,
        searchWord: word
      })
      this.initialize()
      bookModel.search(0, word).then(res=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
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
