import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from './form.model';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(private http: HttpClient) { }

  getFormFields() : Observable<any> {
    return this.http.get('/assets/data.json');
  }
}
