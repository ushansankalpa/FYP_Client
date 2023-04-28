import { Time } from '@angular/common';

export class User {
    id?: number;
    username?: string;
    password?: string
    fullname?: string;
    lastName?: string;
    email?: string;
    imageUrl?: string;
    activated?: boolean;
    langKey?: string;
    createdBy?: string;
    createdDate?: Time;
    lastModifiedBy?: string;
    lastModifiedDate?: Time;
    authorities?: string[];
    token?: string;
    role?: string;
    access_token?: User;
    learning_style?:string
}


 