// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';

//global state of app
//search object,current recipe object,shopping list object,liked recipe
const state={};

const SearchReceipe = async ()=>{
    searchView.clearReceipes();
    const query = searchView.getSearchedInput();
    state.search = new Search(query);
    await state.search.getResults();
    searchView.RenderReceipes(state.search.result);
    searchView.clearSearch();
    console.log(state.search.result);
}

document.querySelector('.search').addEventListener('submit',(e)=>{
    e.preventDefault(),
    SearchReceipe();
})
