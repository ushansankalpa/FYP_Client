import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Observable, filter, map } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  resources!: Resources[];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  constructor(private homeService: HomeService,private primengConfig: PrimeNGConfig,private ms: MessageService,
    private fb: FormBuilder,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // this.homeService.get_all_resources().subscribe((response: HttpResponse<any>) => {
    //   this.resources = response.body;
    // });
    
    this.primengConfig.ripple = true;
    this.getData();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
      
    // }, 1000);
  }

  filter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // filter your data based on the value here
  }

  getData() {
    this.spinner.show();
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
    this.resources = res;
    this.spinner.hide();
  }
  
  protected onRequestError(res:any){
  
  }


  resRatings(val:any, res_id:any){
    const user_id_str = localStorage.getItem('user_id');
    const user_id = user_id_str ? parseInt(user_id_str) : 0;
    //const user_id = parseInt(localStorage.getItem('user_id'));
    const object = this.createSaveObject(val,res_id, user_id);
    this.subscribeToSaveResponse(this.homeService.createRating(object, res_id, user_id));
    
    
  }

  handleOnCancel(){
    this.ms.add({
      severity: 'error',
      summary: 'Rating Removed',
      detail: 'onCancel Event Triggered',
    });
  }

  createSaveObject(val:any,res_id:any, user_id:any) {
    const obj: any = {};
    obj.res_id = res_id;
    obj.user_id = user_id;
    obj.rate = val.value;
    return obj;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any[]>>) {
    result.pipe(
        map((res: HttpResponse<any>) => res.body)
    ).subscribe(
        (res: any) => {
          this.ms.add({
            severity: 'success',
            summary: 'Rating Changed',
            detail: 'New Value: '
        });
        },
        (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  protected onError(errorMessage: string) {
    console.log(errorMessage);
  }

}


export interface Resources {
  res_id?: number;
  title: string;
  desc: string;
  link: string;
  image: string;
  type: string;
  filed: string;
}