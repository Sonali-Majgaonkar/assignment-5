import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { LeaveManagementService } from 'src/app/shared/service/leave-managment.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit{
  staffListArr : any[] = [];
  ls : any =localStorage.getItem('userData');
  constructor(private leaveServe : LeaveManagementService){}
  ngOnInit(): void {
    this.fetchAllStaff();
    this.ls = JSON.parse(this.ls);    
  }
  
  fetchAllStaff(){
    this.leaveServe.getCall()
    .pipe(
      map((staffRes : any)=>{
       let arr = [];
       for(let key in staffRes){
         arr.push({staffId : key , ...staffRes[key]})
        }
       return arr;
      })
    )
    .subscribe((res : any)=>{
      this.staffListArr = res.filter((modData : any)=>{
        return modData.dept == this.ls.dept && modData.clgRole !== 'hod';
      })
    })
  }

  onDeleteBtn(i : number , id : string){
    if(confirm('Are You Sure You Want To Delete This User.')){
      this.leaveServe.deleteCall(id).subscribe((res : any)=>{
        this.fetchAllStaff();
        alert('Remove Successfully..')
      })
    }
  }
}
