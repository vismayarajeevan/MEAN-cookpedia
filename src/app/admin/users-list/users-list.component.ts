import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  // property to hold all users
  allUsers:any =[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllUsers()
  }

  // function to get all users
  getAllUsers(){
     this.api.allUserApi().subscribe((res:any)=>{
      this.allUsers =res
      console.log(this.allUsers);
      
     })
  }

}
