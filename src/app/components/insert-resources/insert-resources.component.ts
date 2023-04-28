import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { InsertResourcesService } from './insert-resources.service';

@Component({
  selector: 'app-insert-resources',
  templateUrl: './insert-resources.component.html',
  styleUrls: ['./insert-resources.component.scss']
})
export class InsertResourcesComponent implements OnInit {

  resourceForm: FormGroup;
  imagePreview: string; // Used to preview the uploaded image
  httpClient: any;
  image: any;

  constructor(private formBuilder: FormBuilder, private insertResources: InsertResourcesService) { }

  ngOnInit(): void {
    this.resourceForm = this.formBuilder.group({
      title: ['', Validators.required],
      desc: [''],
      link: ['', Validators.required],
      image: [[]],
      type: ['', Validators.required],
      field: ['', Validators.required]
    });
  }

  // Triggered when the user selects a file to upload
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // this.resourceForm.patchValue({ image: file.name });
    // this.resourceForm.get('image').updateValueAndValidity();
    this.image = URL.createObjectURL(file)

    // Preview the uploaded image
    const reader = new FileReader();
    
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.image = this.imagePreview;
    };
    reader.readAsDataURL(file);
    
    //this.image = reader.result;
  }

  // Triggered when the form is submitted
  // onSubmit() {
  //   // Get the form data and send it to the server-side API
  //   const formData = new FormData();
  //   formData.append('title', this.resourceForm.get('title').value);
  //   formData.append('desc', this.resourceForm.get('desc').value);
  //   formData.append('link', this.resourceForm.get('link').value);
  //   formData.append('image', this.resourceForm.get('image').value);
  //   formData.append('type', this.resourceForm.get('type').value);
  //   formData.append('field', this.resourceForm.get('field').value);

  //   // Send the form data to the server-side API using Angular's HttpClient
  //   // this.httpClient.post('/post/data', formData).subscribe(
  //   //   response => {
  //   //     console.log('Resource saved successfully!');
  //   //   },
  //   //   error => {
  //   //     console.error('Error saving resource:', error);
  //   //   }
  //   // );
  //   this.subscribeToSaveResponse(this.insertResources.save(formData));
  // }

  onSubmit() {
    const object = this.createSaveObject();
    if(object){
      this.subscribeToSaveResponse(this.insertResources.save(object));
    }
  }

  createSaveObject() {
    const obj: any = {};
    obj.title = this.resourceForm.get('title')?.value;
    obj.desc = this.resourceForm.get('desc')?.value;
    obj.link = this.resourceForm.get('link')?.value;
    obj.image = this.image;
    obj.type = this.resourceForm.get('type')?.value;
    obj.field = this.resourceForm.get('field')?.value;
    return obj;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any[]>>) {
    result.pipe(
        map((res: HttpResponse<any>) => res.body)
    ).subscribe(
        (res: any) => {
            console.log('Registration Successful');
            // this.messageService.add({severity:'success', summary:'Register Successfully', detail:'Your Registration is Successfully'});
        },
        (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  protected onError(errorMessage: string) {
    console.log(errorMessage);
  }
  

}
