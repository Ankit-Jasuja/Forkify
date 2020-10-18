import axios from 'axios';

class Search{
    constructor(query){
        this.query = query;
    }
    async getResults(){
        try{
            const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            console.log(result.data.recipes);
        }
        catch(error){
            alert(error);
        }
    };
}

export default Search;