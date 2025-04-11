import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ErrorHandlerService } from '../services/error-handler.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../shared/custom-snackbar/custom-snackbar.component';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const errorService = inject(ErrorHandlerService);
  const _snackBar = inject( MatSnackBar ); 
  
  
  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      let errorMessage = 'An unexpected error occurred';
        
      if (error.status === 429) {
        errorMessage = 'You have reached the API request limit. Please try again in one minute.';
      } else if (error.status === 404) {
        errorMessage = 'Requested resource not found';
      } else if (error.status === 500) {
        errorMessage = 'Internal server error. Please try again later.';
      }

      _snackBar.openFromComponent(CustomSnackbarComponent, {
        data: errorMessage,
        duration: 10000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar'],
      });

      // Send the error message to a global error handling service
      errorService.setError(errorMessage);

      return throwError(() => error);
    })
  );
};
