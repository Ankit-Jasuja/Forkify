import doms from './base'

export const getSearchedInput = () => doms.searchField.value;
export const RenderReceipes = (receipes) =>{
    receipes.forEach(receipe => {
        RenderReceipe(receipe);
    }); 
}
export const clearReceipes = ()=>{
    document.querySelector(".results__list").innerHTML = "";
}

export const clearSearch = ()=>{
    doms.searchField.value="";
}

const RenderReceipe = (rec)=>{
 const recipeHtml = `
 <li>
 <a class="results__link results" href="#23456">
     <figure class="results__fig">
         <img src=${rec.image_url} alt="Test">
     </figure>
     <div class="results__data">
         <h4 class="results__name">${rec.title}</h4>
         <p class="results__author">${rec.publisher}</p>
     </div>
 </a>
</li>
 `;
 const allRecipesSection = doms.receipesSection;
 allRecipesSection.insertAdjacentHTML('beforeend',recipeHtml);

};
