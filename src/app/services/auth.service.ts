import { Injectable }     from "@angular/core";
import { Headers, Http } from '@angular/http';
import { Router, CanActivate  }         from "@angular/router";

@Injectable()

export class AuthService implements CanActivate {

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'http://localhost:3000/api';

  constructor(private router: Router, public http: Http ) {}

  login(data) {
    data.ttl = 3500;
    return this.http.post(this.apiUrl +'/members/login', data, {headers: this.headers}).toPromise()
        .then(res => {
            this.removeData();
            this.setData( res.json() );
            return res.json();
        });    
  }

  logout() {
      this.removeData();
      this.router.navigate(['/login']);
  }

  isAuthenticated(){
      if(localStorage.getItem('id_token')){
        return true;
      }else{
        return false;
      }
  }
  
  setData(data){
      localStorage.setItem('id_token', data.id);
      localStorage.setItem('ttl', data.ttl);
      localStorage.setItem('loggedAt', data.created);
      localStorage.setItem('memberId', data.userId);
  }

  removeData(){
      localStorage.removeItem('id_token');
      localStorage.removeItem('ttl');
      localStorage.removeItem('loggedAt');
      localStorage.removeItem('memberId');
  }

  canActivate() {
      var memberId = localStorage.getItem('memberId');
      if (this.getTimeLogged() > 0) {

          console.log('TOKEN', localStorage.getItem('id_token'), 'TTL', this.getTimeLogged());
          return true;

      }else{     
          this.http.get(this.apiUrl +'/members/'+ memberId, {headers: this.headers}).toPromise()
          .then()
          .catch(error =>{
              this.removeData();
              this.router.navigate(['login']);
              return false;
          });
      }
  }

  getTimeLogged(){
      var t1 = new Date(localStorage.getItem('loggedAt'));
      var t2 = new Date();
      t1.setSeconds(t1.getSeconds() + parseInt(localStorage.getItem('ttl')));
      return (t1.getTime() - t2.getTime()) / 1000;
  }

}