import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  id : number;
  editMode : boolean;
  recipeForm : FormGroup;
  constructor(private route : ActivatedRoute, private recipeService : RecipeService, private router : Router){

  }

  ngOnInit(){
    this.route.params.subscribe((params : Params)=> {
      this.id=+params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      console.log(this.editMode);
    })
  }

  private initForm(){
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([])
     if(this.editMode){
      let recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            name : new FormControl(ingredient.name, Validators.required),
            amount : new FormControl(ingredient.amount, [Validators.required, Validators.min(0)])
          }))
        }
      }

     }

     this.recipeForm = new FormGroup({
      name : new FormControl(recipeName, Validators.required),
      imagePath : new FormControl(recipeImagePath, Validators.required),
      description : new FormControl(recipeDescription, Validators.required),
      ingredients : recipeIngredients
     })

  }

  ingredientList(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name : new FormControl(null, Validators.required),
      amount :  new FormControl(null, [Validators.required, Validators.min(0)])
    }))
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
  }
  
  onCancel(){
    this.router.navigate(["../"], {relativeTo : this.route})
  }

  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
