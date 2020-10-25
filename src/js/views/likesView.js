import { doms } from "./base";
import {LimitRecipeLength} from "../views/searchView"

 export const toggleLikeButton = (isLiked) =>{
   const iconString = isLiked ? "icon-heart-outlined" : "icon-heart";
   document.querySelector(".recipe__love use").setAttribute('href',`img/icons.svg#${iconString}`)
 }

 export const toggleLikeMenu = (numLikes) =>{
     doms.likesMenu.style.visibility = numLikes > 0 ? "visible": "hidden";
}

export const AddLike = (like) =>{
    const markup = `<li>
    <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
            <img src="${like.img}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${LimitRecipeLength(like.title)}</h4>
            <p class="likes__author">${like.author}</p>
        </div>
    </a>
</li>`;

doms.likesList.insertAdjacentHTML("beforeend",markup);
}

export const RemoveLike = (id) =>{
  const el =  document.querySelector(`.likes__link[href*="${id}"]`).parentElement; 
  if(el){
      el.parentElement.removeChild(el);
  }
}