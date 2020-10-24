import uniqid from 'uniqid';

export default class Likes {
    constructor(){
        this.likes = [];
    }
     
    addLike(id,title,author,img){
     const like = {
         id:id,
         title:title,
         author:author,
         img:img
     }
     this.likes.push(like);
     return like; //returning in this case is just good practice
    }

    deleteLike(id){
      const index = this.likes.findIndex(el=>el.id===id);
      this.likes.splice(index,1);
    }

    isLiked(id){
        return this.likes.findIndex(el=>el.id===id) !== -1;
    }

    getNumerOfLikes(){
        return this.likes.length;
    }

}