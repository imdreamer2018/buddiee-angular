import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

export const handleError = (error: HttpErrorResponse): Observable<any> => {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  }
  else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return throwError(
    `Backend returned code ${error.status}, ` +
    `body was: ${error.error.error}`
  );
};
