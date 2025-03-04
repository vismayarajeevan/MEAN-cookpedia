import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipes',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {

  // create a property to store array of saved recipes
  allRecipes:any =[]
  // api servie dependancy injection
  constructor(private api:ApiService){}
  // call the function inside ngOnInit()
  ngOnInit(){
    this.getAllSavedRecipes()
  }
  // define function to call api
  getAllSavedRecipes(){
    this.api.getSaveRecipeApi().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);
      
    })
  }

  removeSaveRecipe(id:string){
    this.api.deleteSaveRecipeApi(id).subscribe((Res:any)=>{
      this.getAllSavedRecipes()

    })
  }
}
