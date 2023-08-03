import { Component, OnInit } from '@angular/core';
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

  onCloseClick() {
    this.router.navigate(['staffdb']);
  }

  onSubmit() {
    /* console.log(this.date);
     console.log(this.leaveForm.get('fromDate').value);
     console.log(this.leaveForm.get('toDate').value);
    
     console.log((this.leaveForm.get('fromDate').value).split('-').join(''));
     console.log((this.leaveForm.get('toDate').value).split('-').join(''));

      let leaveFrom = (this.leaveForm.get('fromDate').value).split('-').join('');
      let leaveTo = (this.leaveForm.get('toDate').value).split('-').join('');*/

    let leaveFrom = this.leaveForm.get('fromDate').value;
    let leaveTo = this.leaveForm.get('toDate').value;
    if ((leaveFrom <= leaveTo) && leaveFrom > this.date) {

      let leaveObj = { key: this.localStorageData.key, fullName: this.localStorageData.fullName, ...this.leaveForm.value, leaveDays: (leaveTo.split('-').join('') - leaveFrom.split('-').join('') + 1), status: "pending" , dept : this.localStorageData.dept };

      this.mgtServe.getByIdCall(this.localStorageData.key).subscribe((res:any)=>{
        if(res.totalLeave > leaveObj.leaveDays){
          this.mgtServe.postLeaveCall(leaveObj).subscribe((res: any) => {
            this.router.navigate(['staffdb']);
          })
        }else{
          alert(`You Have Only ${res.totalLeave} Leaves..!`)
        }
      })
      this.validationMsg = '';
      this.leaveForm.reset();
    }
    else {
      this.validationMsg = 'Please Select Valid Range';
    }
  }
}