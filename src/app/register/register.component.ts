import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){
    this.registerForm = this.fb.group({
      username:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

    })
  }

  // funtion for register
  register(){
    if(this.registerForm.valid){
       const username = this.registerForm.value.username
       const email = this.registerForm.value.email
       const password = this.registerForm.value.password
       console.log(username,email,password);

      //  api call

      // ***********have both success and error , so use object. success in next key and error in error key **********

      this.api.registerAPI({username,email,password}).subscribe({
        next:(res:any)=>{
          alert(`Welcome ${res.username}, Please login to Explore!!!`)
          this.router.navigateByUrl('/login')
          this.registerForm.reset()
        }, 
        error:(reason:any)=>{
          alert(reason.error)
          this.registerForm.reset()
        }
          
      })

       

    }else{
      alert('Invalid register form')
    }
  }


}
