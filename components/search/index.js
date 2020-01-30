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
    loading: false,
    loadingCenter: false
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
        this._setLock(true)
        bookModel.search(this.getCurrentStart(), this.data.searchWord).then(res => {
          this.setMoreData(res.books)
          this._setLock(false)
        }, ()=>{
          this._setLock(false)
        })
      }
    },

    _setLock(lock_status){
      this.setData({
        loading: lock_status
      })
    },

    onCancel(event){
      this.triggerEvent("cancel", {}, {})
      this.initialize()
    },

    onConfirm(event){
      const word = event.detail.value || event.detail.text
      this.setData({
        searching: true,
        searchWord: word,
        loadingCenter: true
      })

      bookModel.search(0, word).then(res=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(word)
        this.setData({
          loadingCenter: false
        })
      })
    },

    onDelete(event){
      this.initialize()
      this.setData({
        searching: false,
        searchWord: ""
      })
    }
  }
})
