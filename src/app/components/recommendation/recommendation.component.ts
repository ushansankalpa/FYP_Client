import { Component, OnInit } from '@angular/core';
import { Resources } from '../home/home.component';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { RecommendationService } from './recommendation.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
  providers: [MessageService]
})
export class RecommendationComponent implements OnInit {

  resources!: Resources[];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  constructor(private recService: RecommendationService,private primengConfig: PrimeNGConfig,private ms: MessageService,
    private fb: FormBuilder,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    

    this.spinner.show();
    this.primengConfig.ripple = true;
    
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.recommendGetData();
    }, 2000);
  }

  recommendGetData() {
    const user_id = localStorage.getItem('user_id')
    return  this.recService
        .get_recommend_resources(user_id)
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
  }
  
  protected onRequestError(res:any){
  
  }


  resRatings(val:any, res_id:any){
    const user_id_str = localStorage.getItem('user_id');
    const user_id = user_id_str ? parseInt(user_id_str) : 0;
    //const user_id = parseInt(localStorage.getItem('user_id'));
    const object = this.createSaveObject(val,res_id, user_id);
    this.subscribeToSaveResponse(this.recService.createRating(object, res_id, user_id));
    
    
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
