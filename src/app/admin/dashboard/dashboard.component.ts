import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions ={}


  isSidebarOpen:boolean =true
  columnWidth:string ="col-lg-10"

  selected =new Date()
  // users count
  userCount:number =0
  recipeCount:number=0
  downloadCount:number=0
  requestCount:number=0

  constructor(private router:Router, private api:ApiService){
    this.chartOptions ={
      chart:{
        type:'bar'
      },
      title:{
        text:'Analysis of download recipes based on recipes',
        align:'left'
      },
      xAxis:{
        type:'Category'
      },
      yAxis:{
        title:{
          text:'Total download recipe count'
        }
      },
      legend:{
        enabled:false
      },
      credit:{
        enabled:false
      },
      series:[{
        name:"Cuisine",
        coloByPoint:true,
        type:'bar',
        data:[
          {name:"Asian",y:2},
          {name:"Thai",y:1},
          {name:"Italian",y:4}
        ]
      }]

    }
  }

  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getRequestCount()
  }

  getUserCount(){
    this.api.allUserApi().subscribe((res:any)=>{
      this.userCount = res.length
    
    })
  }

  getRecipeCount(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.recipeCount = res.length
    })
  }

  getDownloadCount(){
    this.api.allDownloadListApi().subscribe((res:any)=>{
      console.log(res);
      
      this.downloadCount = res.map((item:any)=>item.count).reduce((a:any,b:any)=>a+b)

    })
  }

  getRequestCount(){
    this.api.allTestimonialListApi().subscribe((res:any)=>{
      this.requestCount = res.filter((item:any)=>item.status =="Pending").length
    })
  }

  menuBtnClick(){
    this.isSidebarOpen =!this.isSidebarOpen
    this.columnWidth ="col"
  }

  logoutAdmin(){
    sessionStorage.clear()
    this.router.navigateByUrl('/')
  }
}
