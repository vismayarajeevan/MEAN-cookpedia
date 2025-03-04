import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  standalone: false,
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent {

  allDownloadList:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllDownloadList()
  }

  getAllDownloadList(){
    this.api.allDownloadListApi().subscribe((res:any)=>{
      this.allDownloadList = res
      console.log(this.allDownloadList);
      
    })
  }

}
