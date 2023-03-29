import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn : 'root'})
export class RecipeService{

    recipesChanged = new Subject<Recipe[]>();

    // private recipes : Recipe[] = [
    //     new Recipe('Fruit Salad', "This is a fruit Salad", "https://i.ytimg.com/vi/xffXCJM_rvU/maxresdefault.jpg", [new Ingredient("Apples", 12),
    //     new Ingredient("Pomegrenate", 8)]),
    //     new Recipe('Potato Wedges', "This are Potato Wedges", "https://www.shutterstock.com/image-photo/fried-potato-wedges-white-sauce-260nw-121911745.jpg", [new Ingredient("Potato", 20),
    //     new Ingredient("Salt", 3)])
    // ];

    private recipes : Recipe[] = [];

    constructor(private shoppingListService : ShoppingListService){

    }

    setRecipes(recipes : Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients : Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index : number){
        return this.recipes[index];
    }

    addRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes);
    }

    updateRecipe(index : number, recipe : Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes);
    }

    deleteRecipe(index : number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes);
    }
}