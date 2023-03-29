import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild("f") slform : NgForm;

  subscription : Subscription;
  editedItemIndex : number;
  editMode = false;
  editedItem : Ingredient;

  constructor(private shoppingListService : ShoppingListService){

  }

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditing.subscribe((index : number)=> {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slform.setValue({
        name : this.editedItem.name,
        amount : this.editedItem.amount
      })
    })
  }

  onSubmit(form : NgForm){
    let value = form.value;
    const i= new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, i);
    }
    else{
      this.shoppingListService.addIngredient(i);
    }
    this.editMode = false;
    form.reset();
   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear(){
    this.slform.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
