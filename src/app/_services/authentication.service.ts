import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Time} from '@angular/common';
import { User } from '../model/user';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private currentUserSubject!: BehaviorSubject<any>;
    public currentUser!: Observable<User>;
    public userDataFromToken!: User;

    constructor(private http: HttpClient) {
        const currentUserJson = localStorage.getItem('currentUser');
        const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
        this.currentUserSubject = new BehaviorSubject<User>(currentUser);

        //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')?? ''));
        this.currentUser = this.currentUserSubject.asObservable();
        if (this.currentUserValue && this.currentUserValue.token) {
             this.userDataFromToken = this.getUserDetails(this.currentUserValue.token);
         }
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    login(credentials: any, authPath: string) {
        return this.http.post<any>(`${environment.apiUrl}/user/login`, credentials, this.httpOptions)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.userDataFromToken = this.getUserDetails(user.access_token);
                //this.userDataFromToken.authorities = ['user'];
                if (this.userDataFromToken.role !== undefined) {
                    localStorage.setItem('userRole', this.userDataFromToken.role);
                    this.userDataFromToken.authorities = [this.userDataFromToken.role];
                }
                
                return this.userDataFromToken;
            }));
    }

    private getUserDetails(token: string) {
        return JSON.parse(atob(token.split('.')[1]));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user_id');
        this.currentUserSubject.next(null);
    }
}
