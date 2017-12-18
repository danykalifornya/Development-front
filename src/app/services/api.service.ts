import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class ApiService {

  private token = localStorage.getItem('id_token');
  private headers = new Headers({'Content-Type': 'application/json', 'Authorization':this.token});
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: Http) { }

  getData(path): Promise <any[]>  {

    return this.http.get(this.apiUrl + '/' + path, {headers: this.headers}).toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  getDataById(id: string, path, filter = ""): Promise<any> {
    const url = `${this.apiUrl}/${path}/${id}?${filter}`;
    return this.http.get(url, {headers: this.headers}).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  create(data, path): Promise<any> {
    const url = `${this.apiUrl}/${path}`;
    return this.http
      .post(url, data, {headers: this.headers}).toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(data, path): Promise<any> {
    const url = `${this.apiUrl}/${path}/${data.id}`;
    return this.http
      .patch(url, data, {headers: this.headers}).toPromise()
      .then(() => data)
      .catch(this.handleError);
  }

  delete(id: number, path): Promise<void> {
    const url = `${this.apiUrl}/${path}/${id}`;
    return this.http.delete(url, {headers: this.headers}).toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getDataDropdown(path, parent = null): Promise <any[]>  {
    return this.http.get(this.apiUrl + '/' + path, {headers: this.headers}).toPromise()
        .then(function(response){
            const data: any[] = [];
            for (let item of response.json()) {
                var label = item.name;
                if(parent){
                    label = '[' + item[parent].name + '] ' + item.name;
                }
                data.push({label:label, value:item.id});
            }
            return data;
        }).catch(this.handleError);
  }

  changePassword(data) {
    const url = `${this.apiUrl}/members/change-password`;
    return this.http.post(url, data, {headers: this.headers}).toPromise()
        .then(res => {
            return res.json();
        });    
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

