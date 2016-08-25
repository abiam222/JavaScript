import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SwDataService {

  constructor(private http: Http) {
  }

  getData() {
    return this.http.get('./swdata.json')
      .map( res => res.json() );
  }
}
