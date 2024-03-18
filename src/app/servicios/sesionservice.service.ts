import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionserviceService {

  private messageSource = new BehaviorSubject<any>(0);
  currentMessage: Observable<any>;
  constructor() {
    this.currentMessage = this.messageSource.asObservable();
  }

  public updateSession(data: boolean) {
    this.messageSource.next(data);
  }
  
}
