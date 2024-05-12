import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'


@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeAuthenticationService(username: string, password: string) {

    let basicAuthHeaderString = 'Basic ' + window.btoa(`${username}:${password}`);

    let headers = new HttpHeaders({ Authorization: basicAuthHeaderString })

    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, 
    { headers }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN ,  basicAuthHeaderString );
          return data;
        }
      )
    );
    // console.log("Execute Hello World Bean Service");
  }

  getAuthenticatedUser(): string | null{
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken(): string | null {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN );
    } else {
      return null;
    }
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout():void {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN )
  }
}

export class AuthenticationBean {
  constructor(public message: string) { }
}


/*

  // //You can inject this service, in which component you wanted 
  // authenticate(username: string, password: string) {
  //   // console.log('before' + this.isUserLoggedIn());
  //   if (username === "in28minutes" && password === "dummy") {
  //     sessionStorage.setItem('authenticatedUser', username);
  //     // console.log('after' + this.isUserLoggedIn());
  //     return true;
  //   } else {
  //     return false;
  //   }

  // }

*/
