import { doms } from "./base";

 export const toggleLikeButton = (isLiked) =>{
   const iconString = isLiked ? "icon-heart-outlined" : "icon-heart";
   document.querySelector(".recipe__love use").setAttribute('href',`img/icons.svg#${iconString}`)
 }

 export const toggleLikeMenu = (numLikes) =>{
     doms.likesMenu.style.visibility = numLikes > 0 ? "visible": "hidden";
  }