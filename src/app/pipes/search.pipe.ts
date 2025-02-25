import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  // make standalone true 
  standalone:true
})
export class SearchPipe implements PipeTransform {

  transform(allRecipes:any[], searchKey:string): any[] {
    let result:any =[]
    if(!allRecipes || searchKey ==""){
      return allRecipes
    }
    result = allRecipes.filter((item:any)=>item.name.toLowerCase().includes(searchKey.toLowerCase()))
    return result;
  }

}
