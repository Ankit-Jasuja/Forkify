// Global app controller
import axios from 'axios';

async function getResults(query){
    try{
        const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        console.log(result.data.recipes);
    }
    catch(error){
        alert(error);
    }
}
getResults('Pizza');