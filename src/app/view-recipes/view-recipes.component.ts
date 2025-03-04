import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipes',
  imports: [HeaderComponent,FooterComponent,RouterLink,],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent {

  // property to holdthe recipe id
  recipeId:string =""

  // to hold recipe 
  recipe:any ={}

  // to hold all related recipes
  allRelatedRecipes:any =[]

  constructor(private route:ActivatedRoute, private api:ApiService){}

  ngOnInit(){
    this.route.params.subscribe((res:any)=>{
         this.recipeId = res.id
         console.log(this.recipeId);
         
         this.getRecipeDetails(this.recipeId)
    })
  }

  getRecipeDetails (recipeId:string){
    this.api.viewRecipeApi(recipeId).subscribe((res:any)=>{
      this.recipe = res
      console.log(this.recipe);
      this.getAllRelatedRecipes(res.cuisine)
      
    })
  }


  getAllRelatedRecipes(cuisine:string){
    this.api.relatedRecipeApi(cuisine).subscribe((res:any)=>{
      
      if(res.length>1){
        this.allRelatedRecipes =res.filter((item:any)=>item.name!= this.recipe.name)
      console.log(this.allRelatedRecipes);
      }else{
        this.allRelatedRecipes=[]
      }
      
    })
  }


// download recipe 
downloadRecipe(){
  this.api.downloaddRecipeApi(this.recipeId,this.recipe).subscribe((res:any)=>{
    this.generatePDF()
  })
}


// generatePdf

generatePDF(){
  const pdf = new jsPDF()
  pdf.setFontSize(16)
  pdf.setTextColor("red")
  pdf.text(this.recipe.name,10,10)
  pdf.setFontSize(12)
  pdf.setTextColor('black')
  pdf.text(`Cuisine: ${this.recipe.cuisine}`,10,20)
  pdf.text(`Serving: ${this.recipe.Serving}`,10,25)
  pdf.text(`Mode of cooking: ${this.recipe.difficulty}`,10,30)
  pdf.text(`Total preperation time: ${this.recipe.prepTimeMinutes}`,10,35)
  pdf.text(`Total cooking time: ${this.recipe.cookTimeMinutes}`,10,40)
  pdf.text(`Total calorie per serving: ${this.recipe.caloriesPerServing}`,10,45)

  // give table

  let head = [['Ingredients Needed','Cooking Instructions']]
  let body = []
  body.push([this.recipe.ingredients, this.recipe.instructions])
  autoTable(pdf,{head,body,startY:50})
  pdf.output("dataurlnewwindow")
  pdf.save("download-recipe.pdf")



}

// save recipe
saveRecipe(){
  this.api.saveRecipeApi(this.recipeId,this.recipe).subscribe({
    next:(res:any)=>{
      alert("Recipe successfully added to your collection!!!")
    },
    error:(reason:any)=>{
      alert(reason.error)
    }
  })
}

}
