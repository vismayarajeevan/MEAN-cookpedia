import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-conatct',
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './conatct.component.html',
  styleUrl: './conatct.component.css'
})
export class ConatctComponent {

  // form handles using reactive forms

  testimonyForm: FormGroup

  // dependancy injection for get api
  // private is access specifiers
  constructor(private fb:FormBuilder, private api:ApiService){
    this.testimonyForm = this.fb.group({
      name:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email:["",[Validators.required, Validators.email]],
      message:["",[Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")]]
    })
  }

  addTestimony(){
    // check fields are valid or not
    if(this.testimonyForm.valid){
      // get all value from input fields
      const name = this.testimonyForm.value.name
      const email = this.testimonyForm.value.email
      const message = this.testimonyForm.value.message
      // alert(`${name}, ${email}, ${message}`)

      // only handle success
      this.api.addTestimonyAPI({name,email,message}).subscribe((res:any)=>{
        alert('Thankyou for your valuable testimony!!!')
        this.testimonyForm.reset()
      })



    }else{
      alert("Invalid Form")
    }
  }

}
