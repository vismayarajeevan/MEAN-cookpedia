import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url ="http://localhost:3000"

  constructor(private http:HttpClient) {}

  // api call for get all recipes
  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  // api call for add testimony
addTestimonyAPI(reqBody:any){
   return this.http.post(`${this.server_url}/add-testimony`,reqBody)
}

  // api call for register
  registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
 }

  // api call for register
  loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
 }

//  append token in req header
   appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token')
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
   }

//  recipe/:id/view
viewRecipeApi(recipeId:string){
  return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
}


//  related-recipe
relatedRecipeApi(cuisine:string){
  return this.http.get(`${this.server_url}/relted-recipe?cuisine=${cuisine}`,this.appendToken())
}

//  recipe/67bc1a7a9dd41c624c7d037a/download
downloaddRecipeApi(recipeId:string,reqBody:any){
  return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())
}

//  recipe/67bc1a7a9dd41c624c7d037a/save
saveRecipeApi(recipeId:string,reqBody:any){
  return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
}

//  recipe/67bc1a7a9dd41c624c7d037a/save
getSaveRecipeApi(){
  return this.http.get(`${this.server_url}/get-save-recipes`,this.appendToken())
}

//  deleterecipe/67bc1a7a9dd41c624c7d037a/save
deleteSaveRecipeApi(id:string){
  return this.http.delete(`${this.server_url}/save-recipes/${id}/delete`,this.appendToken())
}

//  get-download-recipes
getUserDownloadRecipeApi(){
  return this.http.get(`${this.server_url}/user-download`,this.appendToken())
}


//  user/edit
editUserApi(reqBody:any){
  return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())
}

//  all-users
allUserApi(){
  return this.http.get(`${this.server_url}/all-users`,this.appendToken())
}

//  all-dwonload list
allDownloadListApi(){
  return this.http.get(`${this.server_url}/all-downloads`,this.appendToken())
}

//  all-testimonial list
allTestimonialListApi(){
  return this.http.get(`${this.server_url}/all-testimonials`,this.appendToken())
}

//  all-testimonial list
updateTestimonialStatusApi(feedBack:string,status:string){
  return this.http.get(`${this.server_url}/testimonial/${feedBack}/update?status=${status}`,this.appendToken())
}

//  all-testimonial list
getAllApprovedTestimonialApi(){
  return this.http.get(`${this.server_url}/all-approvedtestimonials`)
}

 // api call for add recipe
 addRecipeAPI(reqBody:any){
  return this.http.post(`${this.server_url}/add-recipes`,reqBody,this.appendToken())
}

 // api call for add recipe
 editRecipeAPI(id:string,reqBody:any){
  return this.http.put(`${this.server_url}/recipes/${id}/edit`,reqBody,this.appendToken())
}

 // api call for add recipe
 deleteRecipeAPI(id:string){
  return this.http.delete(`${this.server_url}/recipes/${id}/delete`,this.appendToken())
}

// get chart data
getChartdata(){
  this.allDownloadListApi().subscribe((res:any)=>{
    console.log(res);
    
      // code extracting cuisne and its total download count as object and added to Aan array
      // input: [...{recipecuisine,count}....]
      // output: [{name:cuisine,y:toalcount}]
      let downloadArrayList:any =[]
      let output:any ={}

      res.forEach((item:any)=>{
       let cuisine = item.recipeCuisine
       let currentCount = item.count
       if(output.hasOwnProperty(cuisine)){
         output[cuisine] +=currentCount
       }else{
         output[cuisine] = currentCount

       }
      })

      console.log(output);

      for(let cuisine in output){
       downloadArrayList.push({name:cuisine,y:output[cuisine]})
      }
      console.log(downloadArrayList);

     // algorithm
     // 1.create an empty array for output, and object for storing each array item
     // 2.get each array item of response and store its recipe cuisine & count to a variable
     // 3. Check recipecuisine variable in output object
     //      if present then set the value of recipecuisine key as total existing recipe cuisine value with new count .
     //      not present then insert recipecuisine as key and value S ITS COUNT
     // 4. Push each key and vale
    
  })
}
}
