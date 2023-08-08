import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveManagementService } from '../shared/service/leave-managment.service';
import { filter, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  isShow : boolean = true;
  loginForm: FormGroup | any;
  userList: any[] = [];
  password:any;
  constructor(private mgtServe: LeaveManagementService, private router: Router) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    // console.log(localStorage.getItem('userData'));
  }
  onLoginSubmitBtn() {

    this.mgtServe.getCall()
      .pipe(
        map((res: any) => {
          const userArr: any[] = [];
          for (const key in res) {
            userArr.push({ id: key, clgRole: res[key].clgRole, username: res[key].username, password: res[key].password, fullName: `${res[key].fullName.fName} ${res[key].fullName.lName}`, dept: res[key].dept })
          }
          return userArr;
        })
      )
      .subscribe((userRes) => {
        let result = userRes.find((userObj: any) => {
          return userObj.username == this.loginForm.get('username').value && userObj.password == this.loginForm.get('password').value
        })
        // console.log(userRes);
        if (result) {
          localStorage.setItem('userData', JSON.stringify({ key: result.id, fullName: result.fullName, clgRole: result.clgRole, dept: result.dept }));
          result.clgRole === 'hod' ? this.router.navigate(['hoddb/leaves']) : this.router.navigate(['staffdb']);
          alert('Login Successfull')
        }
        else {
          alert('Username or password incorrect..');
        }
      })
  }

  onShowPasswordToggle(){
   this.isShow = !this.isShow;
  }

}
