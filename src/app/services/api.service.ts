import { HttpClient } from '@angular/common/http';
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


}
