import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn : 'root'})

export class LeaveManagementService{

    private baseUrl = 'https://leave-management-f72ed-default-rtdb.asia-southeast1.firebasedatabase.app/registration.json';
    private leaveUrl = 'https://leave-management-f72ed-default-rtdb.asia-southeast1.firebasedatabase.app/leave.json';
    // private geturl = 'https://leave-management-f72ed-default-rtdb.asia-southeast1.firebasedatabase.app/leave/-N_oUVGi26PydCtnMQGh.json'

    constructor(private http : HttpClient){}
    
    postCall(teachersObj : any){
        return this.http.post(this.baseUrl , teachersObj)
    }
    getCall(){
        return this.http.get(this.baseUrl);
    }
    getByIdCall(key : any){
        return this.http.get(`https://leave-management-f72ed-default-rtdb.asia-southeast1.firebasedatabase.app/registration/${key}.json`)
    }
    patchCall(updatedData : any){
        return this.http.patch(`https://leave-management-f72ed-default-rtdb.asia-southeast1.firebasedatabase.app/registration/${updatedData.id}.json` , updatedData)
    }
    deleteCall(id:any){
        return this.http.delete(`https://leave-management-f72ed-default-rtdb.asia-southeast1.firebasedatabase.app/registration/${id}.json`)
    }
    postLeaveCall(leaveObj : any){
        // console.log("leaveObj" , leaveObj);
        return this.http.post(this.leaveUrl , leaveObj);
    }
    getLeaveCall(){
        return this.http.get(this.leaveUrl);
    }
    getByIdLeaveCall(updateId : any){
        return this.http.get(`https://leave-management-f72ed-default-rtdb.asia-southeast1.firebasedatabase.app/leave/${updateId}.json`);
    }
    patchLeaveCall(updatedLeave : any){
        return this.http.patch(`https://leave-management-f72ed-default-rtdb.asia-southeast1.firebasedatabase.app/leave/${updatedLeave.id}.json` , updatedLeave)
    }
}