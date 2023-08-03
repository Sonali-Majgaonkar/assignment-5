import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveManagementService } from '../shared/service/leave-managment.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
// import { UniqueUsernameValidator } from '../shared/validation/unique-username.validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registerForm: FormGroup | any;
  uniqueUsername : boolean = true;
  validMsg : string ='';

  constructor( private mgtServe : LeaveManagementService , private router : Router ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      clgRole: new FormControl('staff', [Validators.required]),
      fullName: new FormGroup({
        fName: new FormControl('', [Validators.required]),
        lName: new FormControl('', [Validators.required]),
      }),
      email: new FormControl('', [Validators.required , Validators.email]),
      contact: new FormControl('', [Validators.required , Validators.minLength(10) , Validators.maxLength(10)]),
      dept: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required , Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$")]),
    })
  }

  onUserNameBlur(eve : any){
    // console.log('regi' , eve.target.value);
    this.mgtServe.getCall().pipe(
      map((mapRes : any)=>{
        // console.log('mapRes' , mapRes);
        const userArr: any[] = [];
          for (const key in mapRes) {
            userArr.push(mapRes[key].username)
          }
          return userArr;
      })
    ).subscribe((subRes : any)=>{
      // console.log('blur' , subRes);
      if(subRes.includes(eve.target.value)){
        this.uniqueUsername = false;
        this.validMsg = 'this username is already present. please Enter valid username';
      }
      else{
        this.uniqueUsername = true;
        this.validMsg = '';
      }
    })
    
  }

  onRegisterSubmit() {
    // console.log('submitted', this.registerForm);
    if(this.registerForm.valid){
      this.mgtServe.postCall({...this.registerForm.value , totalLeave : 20}).subscribe(res=>{
        // console.log('Response' , res);
      })
      alert('Register Successfully');
      this.registerForm.reset();
      this.router.navigate(['login']);
    }else{
      alert("Something went wrong");
      // console.log(this.registerForm);
      return;
    }
  }
}
