import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  // property to hold dowmload list
  allUserDownloadList:any =[]
  profileImg:string ="https://cdn-icons-png.flaticon.com/512/711/711128.png"

  constructor(private api:ApiService){}


  ngOnInit(){
    this.getUserDownloads()
    const user = JSON.parse(sessionStorage.getItem("user") || "")
    if(user.profilePic){
      this.profileImg = user.profilePic
    }
  }

    getUserDownloads(){
      this.api.getUserDownloadRecipeApi().subscribe((res:any)=>{
        this.allUserDownloadList = res
        console.log(this.allUserDownloadList);
        
      })
    }

    getfile(event:any){
      let uploadFile = event.target.files[0]

      // cover the files to style styleUrl
      let fr = new FileReader()
      fr.readAsDataURL(uploadFile)
      // url islocated in onload
      fr.onload =(event:any)=>{
        console.log(event.target.result);
        this.profileImg = event.target.result
        
      }
    }

    updateProfile(){
      this.api.editUserApi({profilePic:this.profileImg}).subscribe((res:any)=>{
        sessionStorage.setItem("user",JSON.stringify(res))
        this.profileImg = res.profilePic
        alert("Profile updated successfully!!!")
      })
    }
}
