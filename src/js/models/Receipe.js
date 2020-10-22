import axios from "axios";

class Receipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      const recipeDetail = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = recipeDetail.data.recipe.title;
      this.author = recipeDetail.data.recipe.publisher;
      this.img = recipeDetail.data.recipe.image_url;
      this.url = recipeDetail.data.recipe.source_url;
      this.ingredients = recipeDetail.data.recipe.ingredients;
    } catch (error) {
      alert(error);
    }
  }

  parseIngredients() {
    console.log("parsing");
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];
   let newIngredients =  this.ingredients.map((ing) => {
       //make units consistent
      let ingredient = ing.toLowerCase();
      unitsLong.forEach((unit, index) => {
        ingredient = ingredient.replace(unit, unitsShort[index]);
      });
      //remove parenthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      //parse ingredients into count,unit,ingredients

    //1. check if unit exists in ingredient
    const ingredientArray = ingredient.split(" ");
    const unitIndex =ingredientArray.findIndex(z=>unitsShort.includes(z));

    let objIngredient;
    let count;
    if (unitIndex > -1) {
      //there is a unit e.g. "1 1/2 cup water, ice cold " or "1 cup mozzarella, shredded" with unit"
      const arr = ingredientArray.slice(0,unitIndex);// [1,1/2] or [1]
      if(arr.length===1){ 
        //count=arr[0];
        //1-1/3 cup Shortening is also one of the recipe
        count= eval(arr[0].replace("-","+"));
      }
      else {
        count = eval(arr.join("+")); //1+1/2 =>1.5
      }
      objIngredient = {
        count: count,
        unit: ingredientArray[unitIndex],
        ingredient: ingredientArray.slice(unitIndex+1).join(" ")
      };
    } 
    else if (parseInt(ingredientArray[0], 10)) {
      //no units but at 1st position,there is a number e.g. "2 tortilla" without any unit"
      //there is a number but no unit
      objIngredient = {
        count: parseInt(ingredientArray[0], 10),
        unit: "",
        ingredient: ingredientArray.slice(1).join(" "),
      };
    } else if (unitIndex === -1) {
      //there is no unit and no number at 1st position e.g. "red onion to taste, thinly sliced"
      objIngredient = {
        count: 1,
        unit:"",
        ingredient: ingredient,
      };
    }
      return objIngredient;
    });
    
    this.ingredients = newIngredients;
  } 
   //samples :
   //"1 cup mozzarella, shredded" with unit
   //"2 tortilla" without any unit
   //"1 1/2 cup water, ice cold " 2 numbers in beginning
   //"red onion to taste, thinly sliced" without any number

  calcTime() {
    //assumption that we need 15 mins for 3 ingredients
    const periods = Math.ceil(this.ingredients.length / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

}

export default Receipe;
