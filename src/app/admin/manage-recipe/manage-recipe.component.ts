import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

   // to handle cusinedropdown
   cusineArray:any =[]

   // to handle mealtype 
   mealTypeArray:any =[]

   recipeDetails:RecipeModel ={}

   ingredientsArray:any =[]

   instructionArray:any =[]

   constructor(private api:ApiService){}

   
    ngOnInit(){
      this.getAllRecipes()
    }
  
    getAllRecipes(){
      this.api.getAllRecipeAPI().subscribe((res:any)=>{
        
 
        
        // to handle cusine
      res.forEach((item:any)=>{
        !this.cusineArray.includes(item.cuisine) &&  this.cusineArray.push(item.cuisine)
      })
      console.log(this.cusineArray);

      // meal type
      const dummyMeal = res.map((item:any)=>item.mealType)
      // make a single array
      const flatDummyArray = dummyMeal.flat(Infinity)
      flatDummyArray.forEach((item:any)=>{
        !this.mealTypeArray.includes(item) &&  this.mealTypeArray.push(item)

      })
      console.log(this.mealTypeArray);
      
      
      })
    }

    addIngredients(input:any){
      if(input.value){
        this.ingredientsArray.push(input.value)
        input.value =""
        console.log(this.ingredientsArray);
        
      }
      

    }

    removeIngredient(value:string){
      this.ingredientsArray = this.ingredientsArray.filter((item:string)=>item!=value)
    }

    addInstructions(input:any){
      if(input.value){
        this.instructionArray.push(input.value)
        input.value =""
        console.log(this.instructionArray);
        
      }
      

    }

    removeInstructions(value:string){
      this.instructionArray = this.instructionArray.filter((item:string)=>item!=value)
    }
    

    addRecipe(){
      console.log(this.recipeDetails);
      
    }
   
}
