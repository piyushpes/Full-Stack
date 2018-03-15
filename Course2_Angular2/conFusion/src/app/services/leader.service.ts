import { Injectable,Inject } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Http} from '@angular/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class LeaderService {

  constructor(private _http:Http, @Inject('BaseURL') private baseURL , private ProcessHttpmsgService:ProcessHttpmsgService ) { }

  getLeaders(): Observable<Leader[]> {
   return this._http.get(this.baseURL+'leaders')
                    .map(res=> this.ProcessHttpmsgService.extractData(res))
                    .catch(error => { return this.ProcessHttpmsgService.handleError(error); });
  }

  getLeader(id:number):Observable<Leader>{
    return this._http.get(this.baseURL+'leaders/'+id)
    .map(res=> this.ProcessHttpmsgService.extractData(res))
    .catch(error => { return this.ProcessHttpmsgService.handleError(error); });
  }

  getFeaturedLeader():Observable<Leader>{
    //return Promise.resolve(LEADERS.filter((leader)=>(leader.featured))[0]);
    return this._http.get(this.baseURL+'leaders?featured=true')
    .map(res=> this.ProcessHttpmsgService.extractData(res)[0])
    .catch(error => { return this.ProcessHttpmsgService.handleError(error); });
  }

}
