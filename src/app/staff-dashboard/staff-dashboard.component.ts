import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveManagementService } from '../shared/service/leave-managment.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent implements OnInit {
  // noLeave: boolean = false;
  // showForm: boolean = false;
  localData: any;
  leaveList : any[] = [];
  totalLeave : number = 0;
  pendingLeave : any[]=[] ;
  // approveLeave : any[] = [];
  totalApproved : number = 0;
  rejectLeave : any[]=[] ;
  constructor(private router: Router, private leaveServe: LeaveManagementService) {}
  
  ngOnInit(): void {
    if (localStorage.getItem('userData')) {
      this.localData = localStorage.getItem('userData');
      this.localData = JSON.parse(this.localData);
      //console.log(this.localData.key);
    }
    this.getLeaveData();
    
  }
  getStaffData(){
    this.leaveServe.getByIdCall(this.localData.key).subscribe((res : any)=>{
      this.totalLeave = res.totalLeave;
    })    
  }
  getLeaveData(){    
    this.leaveServe.getLeaveCall().pipe( 
      map((res : any)=>{
        const leaveArr = []
        for(let key in res){
          leaveArr.push({...res[key] , leaveID : key})
        }
        // console.log('for ' , leaveArr);
        return leaveArr;
      })
    )
    .subscribe((res : any)=>{
      // console.log('res' , res);
      
      let result = res.filter((myLeave : any)=>{
        return myLeave.key === this.localData.key;
      })
      this.leaveList = result.reverse();
      this.getStaffData();
      this.pendingLeave = result.filter((pendingRes : any)=> pendingRes.status === 'pending')
      result.filter((approveRes : any)=> approveRes.status === 'approved').map((mapRes : any)=>this.totalApproved+= mapRes.leaveDays)
      this.rejectLeave = result.filter((rejectRes : any)=> rejectRes.status === 'rejected');
    })
  }

  refershData(){
    console.log("refersh page")
    this.ngOnInit();
  }

}
