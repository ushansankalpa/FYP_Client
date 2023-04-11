import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
type EntityResponseType = HttpResponse<any>;


@Injectable({ providedIn: 'root' })
export class RegisterService {
    constructor(private http: HttpClient) {
    }
    save(data: any): Observable<EntityResponseType> {
    return this.http.post<any>(`${environment.apiUrl}/user/signup`, data, { observe: 'response' });
    }
}