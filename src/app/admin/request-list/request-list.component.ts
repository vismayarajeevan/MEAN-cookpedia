import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {

  allTestimonails:any =[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllTestimonials()
  }

  getAllTestimonials(){
    this.api.allTestimonialListApi().subscribe((res:any)=>{
      this.allTestimonails = res
      console.log(this.allTestimonails);
      
    })
  }

  updateStatus(id:string,status:string){
    this.api.updateTestimonialStatusApi(id,status).subscribe((res:any)=>{
      this.getAllTestimonials()
    })

  }

}
