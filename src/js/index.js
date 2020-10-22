// Global app controller
import Search from './models/Search';
import Receipe from './models/Receipe';
import {doms,ShowLoader,RemoveLoader} from './views/base';
import * as searchView from './views/searchView';

//global state of app
//search object,current recipe object,shopping list object,liked recipe
const state={};

const SearchReceipe = async () => {
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
    searchView.RenderReceipes(state.search.result,1,10);
    //clear search input
    searchView.clearSearchInput();
    //console.log(state.search.result);
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

state.receipe = new Receipe(35477);
state.receipe.getRecipe();
console.log(state.receipe);