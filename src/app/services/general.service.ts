import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GeneralService {

  	private subject = new Subject<any>();

  	//NOTIFICATIONS
  	showNotify(type: string, title: string, message: string) {
    	this.subject.next({ type: type, title: title, text: message });
  	}

  	getNotify(): Observable<any> {
    	return this.subject.asObservable();
  	}
}