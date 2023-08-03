import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['./no-page-found.component.css']
})
export class NoPageFoundComponent{

  ls : any = localStorage.getItem('userData');
  constructor(private router : Router){
    this.ls = JSON.parse(this.ls);
  }
  onDirectBtn(){
    this.ls.clgRole === 'staff' ? this.router.navigate(['/staffdb']) : this.router.navigate(['/hoddb'])
  }
}
