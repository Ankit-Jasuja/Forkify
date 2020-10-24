import { doms } from "./base";

export const getSearchedInput = () => doms.searchField.value;

//data attribute to store page number
const DisplayPageBUttons = (curPage, type) =>
  `<button class="btn-inline results__btn--${type}" data-Goto=${type === "prev" ? curPage - 1 : curPage + 1}
    <span>Page ${type === "prev" ? curPage - 1 : curPage + 1}</span>
      <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${
          type === "prev" ? "left" : "right"
        }"></use>
      </svg>
    </button>`;

const RenderPageButtons = (recipes,curPage,numberPerPage) =>{
    //check if on first page,last page or middle pages and show buttons accordingly
    const numberOfPages = Math.ceil(recipes.length / numberPerPage);
    let buttons;
    if (curPage === 1 && numberOfPages > 1) {
      //display next button
      buttons = DisplayPageBUttons(curPage, "next");
    } 
    else if (curPage < numberOfPages) {
      //display both buttons
      buttons = `${DisplayPageBUttons(curPage, "prev")}${DisplayPageBUttons(curPage,"next")}`;
    } 
    else if (curPage === numberOfPages && numberOfPages > 1) {
      //display prev button
      buttons = DisplayPageBUttons(curPage, "prev");
    }
    doms.PaginationSection.insertAdjacentHTML('afterbegin',buttons);
};

export const RenderReceipes = (receipes,currentPage,numberPerPage) => {
    //find begin and end of number of recipes e.g. 21 to 30 on page 2
    //Render recipes from begin and end 
    //Provide pagination buttons
    const begin = ((currentPage - 1) * numberPerPage);
    const end = begin + numberPerPage;
    const slicedRecipes = receipes.slice(begin, end);
    slicedRecipes.forEach((receipe) => {
    RenderReceipe(receipe);
    });
    RenderPageButtons(receipes,currentPage,numberPerPage);
};

export const HighLightSelectedRecipe = (recipeId) => {
  //remove highlighted class from all anchor elements
  const elements = Array.from(document.querySelectorAll(".results__link"));
  elements.forEach((el) => el.classList.remove("results__link--active"));

  //select link based on id
  document.querySelector(`.results__link[href*="${recipeId}"]`).classList.add("results__link--active");
};

export const DeletePageButtons = ()=>{
    doms.PaginationSection.innerHTML="";
}

export const clearReceipes = () => {
  doms.receipesSection.innerHTML = "";
};

export const clearSearchInput = () => {
  doms.searchField.value = "";
};

//receipeTitle = 'Tomato pasta with red sauce'
//acc:0,0<17,newtitle=[Tomato]
//acc:6,6<17,newtitle=[Tomato,pasta]

export const LimitRecipeLength = (receipeTitle, limit = 17) => {
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
 <a class="results__link results" href="#${rec.recipe_id}">
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
