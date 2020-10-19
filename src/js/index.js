// Global app controller
import Search from './models/Search';

//global state of app
//serch object,current recipe object,shopping list object,liked recipe
const state={};

const SearchReceipe = async ()=>{
    state.search = new Search('Pizza');
    await state.search.getResults();
    console.log(state.search.result);
}

document.querySelector('.search').addEventListener('submit',(e)=>{
    e.preventDefault(),
    SearchReceipe();
})
