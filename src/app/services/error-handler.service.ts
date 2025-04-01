import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private errorSource = new BehaviorSubject<string | null>(null);
  error$ = this.errorSource.asObservable();

  setError(message:string){
    this.errorSource.next(message);
  }

  clearError(){
    this.errorSource.next(null);
  }
}
