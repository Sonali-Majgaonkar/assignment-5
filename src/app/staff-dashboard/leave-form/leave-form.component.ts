import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveManagementService } from 'src/app/shared/service/leave-managment.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent implements OnInit {
  leaveForm: FormGroup | any;
  validationMsg: string = '';
  date = new Date().toJSON().slice(0, 10);
  localStorageData: any;

  constructor(private router: Router, private mgtServe: LeaveManagementService) { }

  ngOnInit(): void {
    
    console.log('Init works')
    this.leaveForm = new FormGroup({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      status: new FormControl('pending')
    })

    if (localStorage.getItem('userData')) {
      this.localStorageData = localStorage.getItem('userData');
      this.localStorageData = JSON.parse(this.localStorageData)
      // console.log(this.localStorageData);
      // console.log(this.localStorageData.fullName);
    }
  }

  // @Output()
  // change: EventEmitter<any> = new EventEmitter<any>();

  onCloseClick() {
    this.router.navigate(['staffdb']);
  }
  getTotalLeavesDays(fromDate: string, toDate: string) {
    return new Date(new Date(toDate).getTime() - new Date(fromDate).getTime()).getDate()
  }
  onSubmit() {
    /*console.log((this.leaveForm.get('fromDate').value).split('-').join(''));
     console.log((this.leaveForm.get('toDate').value).split('-').join(''));*/

    let leaveFrom = this.leaveForm.get('fromDate').value;
    let leaveTo = this.leaveForm.get('toDate').value;

    if ((leaveFrom <= leaveTo) && leaveFrom > this.date) {

      let leaveObj = { key: this.localStorageData.key, fullName: this.localStorageData.fullName, ...this.leaveForm.value, leaveDays: this.getTotalLeavesDays(leaveFrom, leaveTo), status: "pending", dept: this.localStorageData.dept };

      this.mgtServe.getByIdCall(this.localStorageData.key).subscribe((res: any) => {
        if (res.totalLeave > leaveObj.leaveDays) {
          this.mgtServe.postLeaveCall(leaveObj).subscribe((res: any) => {
            // this.change.emit();
            this.router.navigate(['staffdb']).then(()=>{document.location.reload()});
            this.leaveForm.reset();
          })
        } else {
          alert(`You want to apply leave for ${leaveObj.leaveDays} days..\n But , You Have Only ${res.totalLeave} days Leaves..!`)
        }
      })
      this.validationMsg = ''; 
    }
    else {
      this.validationMsg = 'Please Select Valid Range';
    }
  }
}