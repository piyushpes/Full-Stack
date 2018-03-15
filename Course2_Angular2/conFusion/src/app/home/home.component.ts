import { Component, OnInit,Inject } from '@angular/core';

import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish:Dish;
  promotion:Promotion;
  leader:Leader;
  errMess:string;
  constructor(@Inject('BaseURL') private BaseURL,private dishservice:DishService, private promoservices:PromotionService
              ,private leaderservice:LeaderService) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish=dish,
                                                 errmess => this.errMess = <any>errmess);
    this.promoservices.getFeaturedPromotion().subscribe(promotion => this.promotion=promotion,
                                                        errmess => this.errMess = <any>errmess);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader=leader,
                                                      errmess => this.errMess = <any>errmess);
  }

}
