import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reciepes',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './reciepes.component.html',
  styleUrl: './reciepes.component.css'
})
export class ReciepesComponent {

  
    // property to store all recipes
    allRecipes:any =[]
    // to handle cusinedropdown
  cusineArray:any =[]
  
    // 
    constructor(private api:ApiService){}
  
    // need to call this at page loads
    ngOnInit(){
      this.getAllRecipes()
    }
  
    // make api call
    getAllRecipes(){
      this.api.getAllRecipeAPI().subscribe((res:any)=>{
        this.allRecipes = res
        console.log(this.allRecipes);
        
        // to handle cusine
      this.allRecipes.forEach((item:any)=>{
        !this.cusineArray.includes(item.cuisine) &&  this.cusineArray.push(item.cuisine)
      })
      console.log(this.cusineArray);
      })
    }
  
}
