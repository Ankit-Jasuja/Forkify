
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
     this.persistLikes();//store data in local storage
     return like; //returning in this case is just good practice
    }

    deleteLike(id){
      const index = this.likes.findIndex(el=>el.id===id);
      this.likes.splice(index,1);
      this.persistLikes();//store data in local storage after deleting storage
    }

    isLiked(id){
        return this.likes.findIndex(el=>el.id===id) !== -1;
    }

    getNumerOfLikes(){
        return this.likes.length;
    }

    persistLikes(){
       localStorage.setItem("likes",JSON.stringify(this.likes)); //convert array to string to save to loacl storage
       console.log("persisting likes");
       console.log(localStorage);
    }

    readLikesFromStorage(){
       console.log("readLikesFromStorage") ;
      const likesInStorage = JSON.parse(localStorage.getItem("likes"));
      console.log(likesInStorage) ;
      //restore likes from storage
      if(likesInStorage){
          this.likes = likesInStorage;
      }
    }

}