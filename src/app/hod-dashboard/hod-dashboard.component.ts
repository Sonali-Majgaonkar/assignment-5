import { Component, OnInit } from '@angular/core';
import { LeaveManagementService } from '../shared/service/leave-managment.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-hod-dashboard',
  templateUrl: './hod-dashboard.component.html',
  styleUrls: ['./hod-dashboard.component.css']
})
export class HodDashboardComponent implements OnInit {
  request: boolean = true;
  leaveApprove: boolean = false;
  approved: boolean = true;
  leaveList: any[] = [];
  ls: any = localStorage.getItem('userData');
  constructor(private leaveServe: LeaveManagementService) { }

  ngOnInit(): void {
    this.ls = JSON.parse(this.ls);
    this.getAllLeaves();
  }

  getAllLeaves() {
    this.leaveServe.getLeaveCall().pipe(map((res: any) => {
      let arr: any[] = [];
      for (let key in res) {
        arr.push({ ...res[key], leaveID: key });
      }
      return arr;
    }))
      .subscribe((leaveRes: any) => {

        let leaveArr = leaveRes.filter((filterRes: any) => {
          return filterRes.dept === this.ls.dept;
        })
        this.leaveList = leaveArr.reverse();
        // console.log('leaveList Arr', this.leaveList);
      })
  }

  patchStatus(updatedData: any) {
    this.leaveServe.patchLeaveCall(updatedData).subscribe((res: any) => {
      this.getAllLeaves();
    })
  }
  onApproveClick(id: any, key: any) {
    let updatedStatus = { id: id, status: 'approved' }
    this.leaveServe.patchLeaveCall(updatedStatus).subscribe((res: any) => {
      this.leaveServe.getByIdLeaveCall(id).subscribe((res: any) => {
        let leaveDays = res.leaveDays;
        // console.log('leaveDays ' ,leaveDays);

        this.leaveServe.getByIdCall(key).subscribe((registerRes: any) => {
          let getTotalLeave = registerRes.totalLeave;
          let updatetotalLeave = { id: key, totalLeave: (getTotalLeave - leaveDays) }
          this.leaveServe.patchCall(updatetotalLeave).subscribe((patchRes: any) => {
            console.log('patchRes ', patchRes);
            this.getAllLeaves();

          })
        })
      })
    })
    this.getAllLeaves();
  }

  onRejectClick(id: any, key: any) {
    let updatedStatus = { id: id, status: 'rejected' }
    this.patchStatus(updatedStatus);
    // this.getAllLeaves();
  }

  patchLeaveTotal(id: any, updatedTotalLeave: number) {
    let updateTotalLeave = { id: id, totalLeave: updatedTotalLeave }
    this.leaveServe.patchCall(updateTotalLeave).subscribe(() => { })
  }
}
