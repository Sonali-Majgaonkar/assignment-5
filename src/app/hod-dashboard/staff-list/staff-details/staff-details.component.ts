import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaveManagementService } from 'src/app/shared/service/leave-managment.service';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent implements OnInit {
  staffDetails : any;
  constructor(private activeRoute : ActivatedRoute , private leaveServe : LeaveManagementService){}
  ngOnInit(): void {
    this.activeRoute.fragment.subscribe((res : any)=>{
      this.fetchStaffDetails(res);
    })
  }

  fetchStaffDetails(id : any){
    this.leaveServe.getByIdCall(id).subscribe((staffDetails : any)=>{
      // console.log('hdjsdh' , staffDetails);
       this.staffDetails = staffDetails;
    })
  }
}
