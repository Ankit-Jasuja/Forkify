import { doms, elements } from "./base";
import {Fraction} from 'fractional';

const FormatCount = (count)=>{
     //count : 1.5 => 1 1/2
     //count : 0.5 => 1/2
     if(count)//unusual but never know
     {
        const arr = count.toString().split(".").map(el=>parseInt(el,10));
        if(arr.length===1){
            return count;
        }
        if(arr[0]===0){
           const fr = new Fraction(count);
           return `${fr.numerator}/${fr.denominator}`;
        }
        else{
           const fr = new Fraction(count - arr[0]);
           return `${arr[0]} ${fr.numerator}/${fr.denominator}`;
        }
     }
}

const createIngredientDom = (ingredient)=>`<li class="recipe__item">
                                    <svg class="recipe__icon">
                                        <use href="img/icons.svg#icon-check"></use>
                                    </svg>
                                    <div class="recipe__count">${FormatCount(ingredient.count)}</div>
                                    <div class="recipe__ingredient">
                                        <span class="recipe__unit">${ingredient.unit}</span>
                                        ${ingredient.ingredient}
                                    </div> 
                                    </li>`;

export const clearRecipe =()=>{
    doms.recipeSection.innerHTML="";
}

export const renderRecipe = (recipe) => {
  const markup = `<figure class="recipe__fig">
                        <img src=${recipe.img} alt=${recipe.title} class="recipe__img">
                        <h1 class="recipe__title">
                            <span>${recipe.title}</span>
                        </h1>
                    </figure>

                    <div class="recipe__details">
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="img/icons.svg#icon-stopwatch"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                        <span class="recipe__info-text"> minutes</span>
                    </div>
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="img/icons.svg#icon-man"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                        <span class="recipe__info-text"> servings</span>

                        <div class="recipe__info-buttons">
                            <button class="btn-tiny btn-decrease">
                                <svg>
                                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                                </svg>
                            </button>
                            <button class="btn-tiny btn-increase">
                                <svg>
                                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                                </svg>
                            </button>
                        </div>

                    </div>
                    <button class="recipe__love">
                        <svg class="header__likes">
                            <use href="img/icons.svg#icon-heart-outlined"></use>
                        </svg>
                    </button>
                    </div>

            <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
              ${recipe.ingredients.map(createIngredientDom).join("")} 
            </ul>

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href=${recipe.url} target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>`;
        doms.recipeSection.insertAdjacentHTML("afterbegin",markup);

};

export const updateServingsIngredientsinDom = (recipe) =>{
    //update servings
    document.querySelector(".recipe__info-data--people").textContent = recipe.servings;
    //update ingredients
    const allElements = Array.from(document.querySelectorAll(".recipe__count"));
    recipe.ingredients.forEach((element,index) => {
        allElements[index].textContent = FormatCount(element.count);
    });
}


