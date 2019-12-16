import {
  HTTP
}
from "../util/http-p.js"

class BookModel extends HTTP{
  getHotList(){
    return this.request({
      url: 'book/hot_list'
    })
  }

  getMyBookCount(){
    return this.request({
      url: "book/favor/count",
      data: {

      }
    })
  }

  getDetail(bid){
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  getLikeStatus(bid){
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  getComments(bid){
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  postComment(bid, text){
    return this.request({
      url: 'book/add/short_comment',
      data: {
        book_id: bid,
        content: text
      },
      method: 'POST'
    })
  }
}

export {BookModel}