let paginationBeh = Behavior({
  data: {
    dataArray: [],
    total: null
  },

  methods:{
    setMoreData(dataArray){
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    getCurrentStart(){
      return this.data.dataArray.length
    },

    setTotal(total){
      this.data.total = total
    },

    hasMore(){
      const currentStart = this.getCurrentStart()
      if(currentStart >= this.data.total){
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
        return false
      }else{
        return true
      }
    },

    initialize(){
      this.setData({
        dataArray: [],
        total: null
      })
    }
  }
})

export {paginationBeh}