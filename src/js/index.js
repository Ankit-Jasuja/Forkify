// Global app controller
import Search from './models/Search';
import Receipe from './models/Receipe';
import List from './models/List';
import {doms,ShowLoader,RemoveLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

//global state of app
//search object,current recipe object,shopping list object,liked recipe
const state={};

const SearchReceipe = async () => {
  try {
    //clear already rendered recipes
    searchView.clearReceipes();
    //show loader
    ShowLoader(doms.receipesLoaderSection);
    //get receipes from api
    const query = searchView.getSearchedInput();
    state.search = new Search(query);
    await state.search.getResults();
    //remove loader after getting data
    RemoveLoader();
    //render recipes
    searchView.RenderReceipes(state.search.result, 1, 10);
    //clear search input
    searchView.clearSearchInput();
  } catch (error) {
    alert("something went wrong while searching for recipes");
  }
};

doms.searchButton.addEventListener("submit", (e) => {
  e.preventDefault(), 
  SearchReceipe();
});

//raising event on parent as page buttons do not exists when appl loads
//so use event delegation
doms.PaginationSection.addEventListener("click", (e) => {
  searchView.clearReceipes();
  searchView.DeletePageButtons();
  const targetButton = e.target.closest(".btn-inline"); //No matter where u click (whether button,icon or span) we want only button to be clicked
  const navigatePage = parseInt(targetButton.getAttribute("data-Goto"), 10); //or targetButton.dataset.Goto
  searchView.RenderReceipes(state.search.result, navigatePage, 10);
});

/*
Recipe Controller
*/
const GetSelectedRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    recipeView.clearRecipe();
    ShowLoader(doms.recipeSection);
    if (state.search){                         //highlight only when recipe seacrh has been done
      searchView.HighLightSelectedRecipe(id);
    }
    state.receipe = new Receipe(id);
    try {
      await state.receipe.getRecipe();
      state.receipe.parseIngredients();
     // console.log(state.receipe.ingredients);

      state.receipe.calcTime();
      state.receipe.calcServings();

      RemoveLoader();
      recipeView.renderRecipe(state.receipe);
      
    } 
    catch (error) {
      alert(error);
    }
  }
};

window.addEventListener('hashchange',GetSelectedRecipe);
window.addEventListener('load',GetSelectedRecipe);//this is needed if user directly opens <http://localhost:8080/#47746>,we need id in this case also

doms.recipeSection.addEventListener("click", (e) => {
  //.btn-decrease * => any child of btn decrease
  //if btn-decrease or any of the child is clikced
  if (e.target.matches(".btn-decrease,.btn-decrease *")) {
    if (state.receipe.servings > 1) {
      state.receipe.updateServingsIngredients("dec");
    }
    recipeView.updateServingsIngredientsinDom(state.receipe);
  } 
  else if (e.target.matches(".btn-increase,.btn-increase *")) {
    state.receipe.updateServingsIngredients("inc");
    recipeView.updateServingsIngredientsinDom(state.receipe);
  }
  console.log(state.receipe.ingredients);
});


window.l = new List(); //for testing








