import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message, MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Observable, filter, map } from 'rxjs';
import { Resources } from '../home/home.component';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {

  resources!: Resources[];

  typeOptions!: SelectItem[];
  fieldOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;
  msgs1: Message[];

  type:string ;
  field:string;

  enableBtn: boolean = true;


  constructor(private primengConfig: PrimeNGConfig,private ms: MessageService,
    private fb: FormBuilder,private spinner: NgxSpinnerService,private profileService: ProfileService) { 
      this.typeOptions = [
        {label: 'All', value: 'all'},
        {label: 'Book', value: 'Book'},
        {label: 'Video', value: 'Video'},
        {label: 'Audio', value: 'Audio'}
    ];
      this.fieldOptions = [
        {label: 'All', value: 'all'},
        {label: 'Java', value: 'java'},
        {label: 'Python', value: 'python'},
        {label: 'Programming', value: 'programming'},
        {label: 'Algorithm', value: 'algorithm'}
    ];
    }

  ngOnInit(): void {
    
    // this.homeService.get_all_resources().subscribe((response: HttpResponse<any>) => {
    //   this.resources = response.body;
    // });
    const learning_styles = localStorage.getItem('learning_style');
    
    this.primengConfig.ripple = true;
    this.getData();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
      
    // }, 1000);
  //   this.msgs1 = [
  //     // {severity:'success', summary:'Success', detail:'Your learning style is '+learning_styles ,icon: 'pi-file'},
  //     // {severity:'info', summary:'Info', detail:'Message Content'},
  //     // {severity:'warn', summary:'Warning', detail:'Message Content'},
  //     // {severity:'error', summary:'Error', detail:'Message Content'},
  //     {severity:'success', summary:'Learning Style', detail:'Your learning style is '+learning_styles, icon: 'pi-file'}
  // ];
  }

  filter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // filter your data based on the value here
  }

  getData() {
    const user_id = localStorage.getItem('user_id')
    this.spinner.show();
    return  this.profileService
        .get_all_resources(user_id)
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
    this.subscribeToSaveResponse(this.profileService.createRating(object, res_id, user_id));
  }


  onTypeChange(event){
    this.type = event.value;
    const obj = {type: this.type, field: this.field}
    // if(this.field != undefined && this.type != undefined){
    //   this.enableBtn = false;
    // }
    this.subscribeToSearchResponse(this.profileService.search(obj));
  }

  onFieldChange(event){
    this.field = event.value;
    const obj = {type: this.type, field: this.field}
    // if(this.field != undefined && this.type != undefined){
    //   this.enableBtn = false;
    // }
    this.subscribeToSearchResponse(this.profileService.search(obj));
  }

  search(){
    const obj = {type: this.type, field: this.field}
    this.subscribeToSearchResponse(this.profileService.search(obj));
  }

  handleOnCancel(res_id:any){
    const user_id_str = localStorage.getItem('user_id');
    const user_id = user_id_str ? parseInt(user_id_str) : 0;
    //const user_id = parseInt(localStorage.getItem('user_id'));
    const object = this.createSaveObject(0,res_id, user_id);
    this.subscribeToSaveResponse(this.profileService.createRating(object, res_id, user_id));
    this.ms.add({
      severity: 'error',
      summary: 'Rating Removed',
      detail: 'Rating Removed',
    });
  }

  createSaveObject(val:any,res_id:any, user_id:any) {
    if(val === 0){
      const obj: any = {};
      obj.res_id = res_id;
      obj.user_id = user_id;
      obj.rate = 0;
      return obj;
    }else{
      const obj: any = {};
      obj.res_id = res_id;
      obj.user_id = user_id;
      obj.rate = val.value;
      return obj;
    }
    
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

  protected subscribeToSearchResponse(result: Observable<HttpResponse<any[]>>) {
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
