// Global app controller
import Search from './models/Search';
import Receipe from './models/Receipe';
import {doms,ShowLoader,RemoveLoader} from './views/base';
import * as searchView from './views/searchView';

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
    //const query = searchView.getSearchedInput();
    const query = "PIZZA"; //only for testing
    state.search = new Search(query);
    await state.search.getResults();
    //remove loader after getting data
    RemoveLoader();
    //render recipes
    searchView.RenderReceipes(state.search.result, 1, 10);
    //clear search input
    searchView.clearSearchInput();
    //console.log(state.search.result);
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
    console.log(id);
    state.receipe = new Receipe(id);
    try {
      await state.receipe.getRecipe();
      state.receipe.calcTime();
      state.receipe.calcServings();
      console.log(state.receipe.ingredients);
      state.receipe.parseIngredients();
      console.log(state.receipe.ingredients);
    } catch (error) {
      alert("error processing receipe");
    }
  }
};

//test code
window.addEventListener('load', (e) => {
  e.preventDefault(), 
  SearchReceipe();
});


window.addEventListener('hashchange',GetSelectedRecipe);
window.addEventListener('load',GetSelectedRecipe);//this is needed if user directly opens <http://localhost:8080/#47746>,we need id in this case also









