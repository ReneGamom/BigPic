import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  currentUser: IUser;
  loginUser(userName: string, password: string) {
    const loginInfo = { username: userName, password };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post('/api/login', loginInfo, options)
      .pipe(
        tap((data) => {
          // tslint:disable-next-line: no-angle-bracket-type-assertion
          // tslint:disable-next-line: whitespace
          this.currentUser = data as IUser;
        })
      )
      .pipe(
        catchError((err) => {
          return of(false);
        })
      );
  }
  isAuthenticated() {
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put(
      `/api/users/${this.currentUser.id}`,
      this.currentUser,
      options
    );
  }

  // on peux aussi retourner this.http et positioner le subscribe plustot a destination et etre cablabe de reagir a cet appel
  checkAuthenticationStatus() {
    this.http
      .get('/api/currentIdentity')
      .pipe(
        tap((data) => {
          if (data instanceof Object) {
            this.currentUser = data as IUser;
          }
        })
      )
      .subscribe();
  }
  logOut() {
    this.currentUser = undefined;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post('/api/logout', {}, options);
  }
  // seconde facon de faire
  // checkAuthenticationStatus(){
  //   this.http.get('/api/currentIdentity')
  //   .subscribe(data=>{
  //     if (data instanceof Object){
  //       this.currentUser=<IUser>data;
  //     }
  //   });
  // }
}
