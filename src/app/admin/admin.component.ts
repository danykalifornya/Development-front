import { Component, OnDestroy }          from '@angular/core';
import { GeneralService }         from '../services/general.service';
import { AuthService }         from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'my-admin',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.css' ]
})

export class AdminComponent implements OnDestroy {

    message: any;
    subscription: Subscription;
  	msgs: Message[] = [];
  	
  	constructor(
      private generalService: GeneralService,
      private authService: AuthService
   	) { 

        this.subscription = this.generalService.getNotify().subscribe(message => {

        	this.msgs.push({severity:message.type, summary:message.title, detail:message.text});
        });
   	}

  	logout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
