// Global app controller
import Search from './models/Search';
import {doms,ShowLoader,RemoveLoader} from './views/base';
import * as searchView from './views/searchView';

//global state of app
//search object,current recipe object,shopping list object,liked recipe
const state={};

const SearchReceipe = async () => {
  searchView.clearReceipes();
  ShowLoader(doms.receipesLoaderSection);
  const query = searchView.getSearchedInput();
  state.search = new Search(query);
  await state.search.getResults();
  RemoveLoader();
  searchView.RenderReceipes(state.search.result);
  searchView.clearSearch();
  //console.log(state.search.result);
};

doms.searchButton.addEventListener("submit", (e) => {
  e.preventDefault(), 
  SearchReceipe();
});
