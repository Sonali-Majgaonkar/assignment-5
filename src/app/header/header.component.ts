import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveManagementService } from '../shared/service/leave-managment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , DoCheck{
  currentUserKey : string = '';
  currentUserName : string ='';
  isHeaderShow : boolean = false;
  showHodMenu : boolean = false;
  ls : any = localStorage.getItem('userData');

  constructor( private router : Router , private leaveMgtServe : LeaveManagementService){
    this.ls = JSON.parse(this.ls);
    this.currentUserKey = this.ls?.key;
    this.currentUserName = this.ls?.fullName;
    console.log(this.currentUserName);
    
    this.leaveMgtServe.getByIdCall(this.currentUserKey).subscribe((currentRes : any)=>{
      currentRes?.clgRole ==="hod"?this.showHodMenu = true : this.showHodMenu = false
    })
  }
  ngOnInit(): void {
    // this.currentUserKey === 'hod' ? this.showHodMenu = true : this.showHodMenu = false;
    // console.log("header comp loads")
  }

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    currentUrl === '/login' || currentUrl === '/registration' ?this.isHeaderShow = false: this.isHeaderShow=true;    
  }

  onLogoutBtn(){
    if(confirm('Are you sure ! You want to logout ?')){
      localStorage.removeItem('userData');
      this.router.navigate(['login'])
    }
  }
}
