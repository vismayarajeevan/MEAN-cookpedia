import { Component, Input, input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  @Input() id !:string
   // to handle cusinedropdown
   cusineArray:any =[]

   // to handle mealtype 
   mealTypeArray:any =[]

   recipeDetails:RecipeModel ={}

   ingredientsArray:any =[]

   instructionArray:any =[]

   mealArray:any =[]

   constructor(private api:ApiService, private router:Router){}

   
    ngOnInit(){
      this.getAllRecipes()
    }
  
    getAllRecipes(){
      this.api.getAllRecipeAPI().subscribe((res:any)=>{
        
        // for edit take value from input field
        if(this.id){
          this.recipeDetails =res.find((item:any)=>item._id==this.id)
          this.ingredientsArray =this.recipeDetails.ingredients
          this.instructionArray = this.recipeDetails.instructions
          this.mealArray = this.recipeDetails.mealType
        }
 
        
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

    addIngredients(ingredients:any){
      if(ingredients.value){
        this.ingredientsArray.push(ingredients.value)
        ingredients.value =""
        console.log(this.ingredientsArray);
        
      }
      

    }

    removeIngredient(value:string){
      this.ingredientsArray = this.ingredientsArray.filter((item:string)=>item!=value)
    }

    addInstructions(instructions:any){
      if(instructions.value){
        this.instructionArray.push(instructions.value)
        instructions.value =""
        console.log(this.instructionArray);
        
      }
      

    }

    removeInstructions(value:string){
      this.instructionArray = this.instructionArray.filter((item:string)=>item!=value)
    }

    mealTypeSelect(event:any){
      if(event.target.checked){
        !this.mealArray.includes(event.target.name) && this.mealArray.push(event.target.name)
      }else{
        this.mealArray = this.mealArray.filter((item:string)=>item!=event.target.name)
      }
      console.log(this.mealArray);
      

    }
    
    removeMealType(meal:string){
      this.mealArray = this.mealArray.filter((item:string)=>item!=meal)

    }

    addRecipe(){
      console.log(this.recipeDetails);
      // 1.add ingredients instructions and meal array to recipe details
      this.recipeDetails.ingredients = this.ingredientsArray
      this.recipeDetails.instructions = this.instructionArray
      this.recipeDetails.mealType = this.mealArray
      const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails 
      // 2.check all fields have value in recipe details
      if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
        console.log(name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType);
        
        // if all values present 
        this.api.addRecipeAPI(this.recipeDetails).subscribe({
          next:(res:any)=>{
            alert("recipe added successfulyy!!")
            this.recipeDetails ={}
            this.ingredientsArray =[]
            this.instructionArray =[]
            this.mealArray=[]
            this.router.navigateByUrl('/admin/recipe-list')

          }
        })
        error:(reason:any)=>{
          alert(reason.error)
          this.recipeDetails.name =""
        }
        // if api call sucess -- clear all fields, aler"recipe added" to all recipe pga
        // if api call field - clear name field

      }else{
        alert("Please fill the form!!!")
      }
      // if all values present then api call
      // if all values are not present, give alert 
      
    }
   
    editRecipe(){
      console.log(this.recipeDetails);
      // 1.add ingredients instructions and meal array to recipe details
      this.recipeDetails.ingredients = this.ingredientsArray
      this.recipeDetails.instructions = this.instructionArray
      this.recipeDetails.mealType = this.mealArray
      const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails 
      // 2.check all fields have value in recipe details
      if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
        this.api.editRecipeAPI(this.id,this.recipeDetails).subscribe((res:any)=>
          {
            alert("recipe updated successfulyy!!")
            this.recipeDetails ={}
            this.ingredientsArray =[]
            this.instructionArray =[]
            this.mealArray=[]
            this.router.navigateByUrl('/admin/recipe-list')

          })
       
        // if api call sucess -- clear all fields, aler"recipe added" to all recipe pga
        // if api call field - clear name field

        
        // if all values present 
      
        // if api call sucess -- clear all fields, aler"recipe added" to all recipe pga
        // if api call field - clear name field

      }else{
        alert("Please fill the form!!!")
      }
      // if all values present then api call
      // if all values are not present, give alert 
      
    }

    
}
