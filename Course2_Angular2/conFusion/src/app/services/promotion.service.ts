import { Injectable,Inject } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';
import { Observable } from 'rxjs/Observable';
import {Http} from '@angular/http';
import {Restangular} from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class PromotionService {

  constructor(private restangular:Restangular,@Inject('BaseURL') private BaseURL,private processHTTPMsgService:ProcessHttpmsgService ) { }

  getPromotions(): Observable<Promotion[]> {
    //return Promise.resolve(PROMOTIONS);
    return this.restangular.all('promotions').getList();

   /* return this._http.get(this.BaseURL+'promotions')
    .map(res => { return this.processHTTPMsgService.extractData(res); })
    .catch(error => { return this.processHTTPMsgService.handleError(error); }); */
  }

  getPromotion(id:number):Observable<Promotion>{
    //return Promise.resolve(PROMOTIONS.filter((promo)=>(promo.id===id))[0]);
    /*return this._http.get(this.BaseURL+'promotions/'+id)
    .map(res => { return this.processHTTPMsgService.extractData(res); })
    .catch(error => { return this.processHTTPMsgService.handleError(error); });*/

    return this.restangular.one('promotions',id).get();
  }

  getFeaturedPromotion():Observable<Promotion>{
    //return Promise.resolve(PROMOTIONS.filter((promo)=>(promo.featured))[0]);
    /*return this._http.get(this.BaseURL+'promotions?featured=true')
    .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
    .catch(error => { return this.processHTTPMsgService.handleError(error); });*/

    return this.restangular.all('promotions').getList({featured:true})
                          .map(promotions=>promotions[0]);
  }

}
