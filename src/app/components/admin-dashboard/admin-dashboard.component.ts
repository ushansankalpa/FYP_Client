import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { AdminDashboardService } from './admin-dashboard.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [MessageService]
})
export class AdminDashboardComponent implements OnInit {

  //view: any[];
  allusers:any;
  allresources:any;
  res:any;
  users:any;
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;

  view: any[] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Learning Preference';
  showYAxisLabel = true;
  yAxisLabel = 'Users';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  msgs1: Message[]
  //pie
  showLabels = true;
  // data goes here
public single = [
];

  constructor(private homeService: AdminDashboardService, private ms: MessageService) { }

  ngOnInit(): void {
    this.getData();
    this.getResData();
    this.getUserData();
  }

  getData() {
    //this.spinner.show();
    return  this.homeService
        .get_learning_style()
        .pipe(
            filter((res: HttpResponse<any>) => res.ok),
            map((res: HttpResponse<any>) => res.body)
        ).subscribe(
            (res: any) => this.onRequestSuccess(res),
            (res: any) => this.onRequestError(res.message)
        );
  }

  getResData() {
    //this.spinner.show();
    return  this.homeService
        .get_all_resources()
        .pipe(
            filter((res: HttpResponse<any>) => res.ok),
            map((res: HttpResponse<any>) => res.body)
        ).subscribe(
            (res: any) => this.onRequestResSuccess(res),
            (res: any) => this.onRequestError(res.message)
        );
  }

  getUserData() {
    //this.spinner.show();
    return  this.homeService
        .get_all_users()
        .pipe(
            filter((res: HttpResponse<any>) => res.ok),
            map((res: HttpResponse<any>) => res.body)
        ).subscribe(
            (res: any) => this.onRequestUserSuccess(res),
            (res: any) => this.onRequestError(res.message)
        );
  }

  protected onRequestSuccess(res:any){
    this.single = res;
    //this.spinner.hide();
  }

  protected onRequestResSuccess(res:any){
    this.res = res.length;
    //this.spinner.hide();
  }

  protected onRequestUserSuccess(res:any){
    this.users = res.length;
    //this.spinner.hide();
  }
  
  protected onRequestError(res:any){
  
  }

  export(){
    return  this.homeService
        .export_csv()
        .pipe(
            filter((res: HttpResponse<any>) => res.ok),
            map((res: HttpResponse<any>) => res.body)
        ).subscribe(
            (res: any) => {
              this.msgs1 = [
                {severity:'success', summary:'Export ratings.csv', detail:'Succefully Export CSV', icon: 'pi-file'}
            ];
            this.ms.add({severity:'success', summary:'Export ratings.csv', detail:'Succefully Export CSV', icon: 'pi-file'});
            },
            (res: any) => this.onRequestError(res.message)
        );
  }

}
