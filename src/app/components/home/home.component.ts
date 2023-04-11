import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Observable, filter, map } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  resources!: any[];
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    // this.homeService.get_all_resources().subscribe((response: HttpResponse<any>) => {
    //   this.resources = response.body;
    // });
    this.getData();
  }

  getData() {
    return  this.homeService
        .get_all_resources()
        .pipe(
            filter((res: HttpResponse<any>) => res.ok),
            map((res: HttpResponse<any>) => res.body)
        ).subscribe(
            (res: any) => this.onRequestSuccess(res),
            (res: any) => this.onRequestError(res.message)
        );
  }

  protected onRequestSuccess(res:any){
    debugger
    this.resources = res;
  }
  
  protected onRequestError(res:any){
  
  }

}
