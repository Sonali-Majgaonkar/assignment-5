
// import { AbstractControl, ValidationErrors } from "@angular/forms";
// import { LeaveManagementService } from "../service/leave-managment.service";

// export class NoSpaceValidator{
//     // private name = ' string'
//     constructor(private mgtServe : LeaveManagementService){}
//     static noSpace (control : AbstractControl) : ValidationErrors | null  {
        
//         if(control.value?.includes(' ')){
//             return {noSpace : true}
//         }
//         else{
//             return null;
//         }
//     }
// }



// import { Injectable } from "@angular/core";
// import { AbstractControl, ValidationErrors } from "@angular/forms";
// import { Observable, Subscription } from "rxjs";
// // import { LeaveManagementService } from "../service/leave-managment.service";
// import { HttpClient } from "@angular/common/http";
// import { LeaveManagementService } from "../service/leave-managment.service";

// // @Injectable({providedIn : 'root'})
// export class UniqueUsernameValidator{ 
//     constructor (private leaveserve : LeaveManagementService){}
//     static uniqueUsername(control : AbstractControl) : ValidationErrors | null {
//         // let http !: HttpClient ;
//         this.
//         http?.get('https://leave-management-f72ed-default-rtdb.asia-southeast1.firebasedatabase.app/registration.json').subscribe((res)=>{
//             console.log('validation res' , res);            
//         })
//         return {uniqueUsername : true};
//     }
// }



// constructor(private leaveServe : LeaveManagementService , private HttpClient : HttpClient){
    //     this.getUserName();
    // }| Promise<ValidationErrors | null>  | Observable<ValidationErrors | null>

    // private getUserName(){
    //     this.leaveServe.getCall().subscribe((res)=>{
    //         console.log('validator res' , res)
    //     })
    // }