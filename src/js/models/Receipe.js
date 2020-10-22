import axios from "axios";

class Receipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
      try{
        const recipeDetail = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.title = recipeDetail.data.recipe.title;
        this.author = recipeDetail.data.recipe.publisher;
        this.img = recipeDetail.data.recipe.image_url;
        this.url = recipeDetail.data.recipe.source_url;
        this.ingredients = recipeDetail.data.recipe.ingredients;
      }
    catch(error){
        alert(error);
    }
  }

  calcTime(){
      //assumption that we need 15 mins for 3 ingredients
      const periods = Math.ceil(this.ingredients.length / 3);
      this.time = periods * 15;
  }

  calcServings(){
      this.servings = 4;
  }
}

export default Receipe;
