import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reciepes',
  standalone:true,
  imports: [HeaderComponent,FooterComponent,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './reciepes.component.html',
  styleUrl: './reciepes.component.css'
})
export class ReciepesComponent {

    // pagination
    p:number =1
    
     searchKey:string =""
    // property to store all recipes
    allRecipes:any =[]

    // to get proper filtering
    dummyAllRecipes:any =[]

    // to handle cusinedropdown
    cusineArray:any =[]

    // to handle mealtype 
    mealTypeArray:any =[]


  
    // 
    constructor(private api:ApiService, private router:Router){}
  
    // need to call this at page loads
    ngOnInit(){
      this.getAllRecipes()
    }
  
    // make api call
    getAllRecipes(){
      this.api.getAllRecipeAPI().subscribe((res:any)=>{
        this.allRecipes = res

        // put allrecipes to dummyallrecipes
        this.dummyAllRecipes = this.allRecipes
        console.log(this.allRecipes);
        
        // to handle cusine
      this.allRecipes.forEach((item:any)=>{
        !this.cusineArray.includes(item.cuisine) &&  this.cusineArray.push(item.cuisine)
      })
      console.log(this.cusineArray);

      // meal type
      const dummyMeal = this.allRecipes.map((item:any)=>item.mealType)
      // make a single array
      const flatDummyArray = dummyMeal.flat(Infinity)
      flatDummyArray.forEach((item:any)=>{
        !this.mealTypeArray.includes(item) &&  this.mealTypeArray.push(item)

      })
      console.log(this.mealTypeArray);
      
      
      })
    }

    // filter recipes function
    filterAllRecipes(key:string,value:string){
      this.allRecipes = this.dummyAllRecipes.filter((item:any)=>item[key].includes(value))
    }

    viewRecipe(recipeId:string){
      if(sessionStorage.getItem('token')){
        // view recipe page
        this.router.navigateByUrl(`recipes/${recipeId}/view`)
      }else{
        alert("Please login to get full acess!!")
      }

    }
  
}
