import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import {Feedback} from '../shared/feedback'

@Injectable()
export class FeedbackService {

  constructor(private restangular:Restangular) { }


  submitFeedback(fbk:Feedback) {
    let feedbks=this.restangular.all('feedback');
    return feedbks.post(fbk);
  }
}
