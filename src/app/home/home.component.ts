import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // property to store all recipes
  allRecipes:any =[]

  allApprovedTestimony:any =[]
  

  // 
  constructor(private api:ApiService){}

  // need to call this at page loads
  ngOnInit(){
    this.getAllRecipes()
    this.getAllApprovedTestimony()
  }

  // make api call
  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.allRecipes = res.slice(0,6)
      console.log(this.allRecipes);

      
      
      
    })
  }

  // get all aprroved testimony
  getAllApprovedTestimony(){
    this.api.getAllApprovedTestimonialApi().subscribe((res:any)=>{
      this.allApprovedTestimony =res
      console.log(this.allApprovedTestimony);
      
    })
  }

}
