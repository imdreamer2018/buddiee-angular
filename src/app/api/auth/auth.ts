import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Header} from '../options';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {handleError} from '../handleError';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  BASE_URL = environment.apiUrl;
  header: Header = {
    headers: new HttpHeaders({
      Accept: 'application/json;charset=UTF-8',
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  login(loginUserDto): Observable<any> {
    return this.http.post<any>(this.BASE_URL + '/auth/login', loginUserDto, this.header)
      .pipe(
        catchError(handleError)
      );
  }

  logout(): void {
    this.http.post(this.BASE_URL + '/auth/logout', this.header);
  }
}
