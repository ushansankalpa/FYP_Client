import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LsidentiferTestService } from './lsidentifer-test.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lsidentifer-test',
  templateUrl: './lsidentifer-test.component.html',
  styleUrls: ['./lsidentifer-test.component.scss'],
  providers:[MessageService]
})
export class LSIdentiferTestComponent implements OnInit {

  @Input() user_id: string;


  enableBtn: boolean;
  ngOnInit(): void {
    this.enableBtn = false;
  }

  questionResponses: number[] = [];

constructor(private http: HttpClient,private ms: MessageService,private lsTestService: LsidentiferTestService,private router: Router,) { }

onQuestionChange(questionIndex: number, responseValue: number): void {
this.questionResponses[questionIndex] = responseValue;
}

onSubmit(): void {
this.http.post('api/submit-questionnaire', { responses: this.questionResponses })
.subscribe(response => console.log(response));
}

questionsArray = [
  '1.) I learn better by reading what the teacher writes on the chalkboard',
  '2.) When I read instructions, I remember them better.',
  '3.) I understand better when I read instructions.',
  '4.) I learn better by reading than by listening to someone.',
  '5.) I learn more by reading textbooks than by listening to lectures.	',
  '6.) When the teacher tells me the instructions I understand better	',
  '7.) When someone tells me how to do something in class, I learn it better.	',
  '8.) I remember things I have heard in class better than things I have read.	',
  '9.) I learn better in class when the teacher gives a lecture.	',
  '10.) I learn better in class when I listen to someone.	',
  '11.) I prefer to learn by doing something in class.	',
  '12.) When I do things in class, I learn better.	',
  '13.) I enjoy learning in class by doing experiments.	',
  '14.) I understand things better in class when I participate in role-playing.	',
  '15.) I understand things better in class when I participate in role-playing.	',
];
responsesArray = [];

getRadioValue(questionIndex: number, value: string) {
  this.responsesArray[questionIndex] = value;
  if(this.responsesArray.length == 15){
    this.enableBtn = true;
    this.ms.add({
      severity: 'success',
      summary: 'Rating Changed',
      detail: 'New Value: '
  });
  }
  console.error(this.responsesArray)
}

postResult(){
  let user_id
  if(this.user_id){
    user_id = this.user_id
  }else{
    user_id = localStorage.getItem('user_id')
  }
  
  var b = this.responsesArray.map(function(item) {
    return parseInt(item, 10);
});
 this.subscribeToSaveResponse(this.lsTestService.testResult(b,user_id));
}

protected subscribeToSaveResponse(result: Observable<HttpResponse<any[]>>) {
  result.pipe(
      map((res: HttpResponse<any>) => res.body)
  ).subscribe(
      (res: any) => {
          console.log(' Successful');
          this.router.navigate(['/recommendations']);
          // this.messageService.add({severity:'success', summary:'Register Successfully', detail:'Your Registration is Successfully'});
      },
      (res: HttpErrorResponse) => this.onError(res.message)
  );
}

protected onError(errorMessage: string) {
  console.log(errorMessage);
}

}
