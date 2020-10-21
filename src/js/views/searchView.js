import { doms } from "./base";

export const getSearchedInput = () => doms.searchField.value;

export const RenderReceipes = (receipes) => {
  receipes.forEach((receipe) => {
    RenderReceipe(receipe);
  });
};
export const clearReceipes = () => {
  doms.receipesSection.innerHTML = "";
};

export const clearSearch = () => {
  doms.searchField.value = "";
};

//receipeTitle = 'Tomato pasta with rec sauce'
//acc:0,0<17,newtitle=[Tomato]
//acc:6,6<17,newtitle=[Tomato,pasta]

const LimitRecipeLength = (receipeTitle, limit = 17) => {
  const newTitle = [];
  if (receipeTitle.length > limit) {
    const receipesParts = receipeTitle.split(" ");
    receipesParts.reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}....`;
  }
  return receipeTitle;
};

const RenderReceipe = (rec) => {
  const recipeHtml = `
 <li>
 <a class="results__link results" href=${rec.recipe_id}>
     <figure class="results__fig">
         <img src=${rec.image_url} alt=${rec.title}>
     </figure>
     <div class="results__data">
         <h4 class="results__name">${LimitRecipeLength(rec.title)}</h4>
         <p class="results__author">${rec.publisher}</p>
     </div>
 </a>
</li>
 `;
  const allRecipesSection = doms.receipesSection;
  allRecipesSection.insertAdjacentHTML("beforeend", recipeHtml);
};
