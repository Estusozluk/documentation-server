import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(private httpClient : HttpClient) { }

  async signIn(username : string, password : string) : Promise<boolean> {
    const request = this.httpClient.post("/login", { username: username, password: password })
    const data = await lastValueFrom(request) as {userExists : boolean};
    this.isLoggedIn = data.userExists;
    return data.userExists;    
      // .subscribe((value : any) => {
      //   if (value.userExists) {
      //     this.isLoggedIn = true;
      //   } else {
      //     this.isLoggedIn = false;
      //   }
      // } )
  }
}
