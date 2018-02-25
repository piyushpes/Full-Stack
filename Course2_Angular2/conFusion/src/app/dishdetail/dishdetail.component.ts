import { Component, OnInit, Input } from '@angular/core';
import {Dish} from '../shared/dish';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})



export class DishdetailComponent implements OnInit {
  dish:Dish;
  dishids:number[];
  prev:number;
  next:number;
  constructor(private dishservice:DishService, private location:Location,private route:ActivatedRoute) { }

  ngOnInit() {
    //let id=+this.route.snapshot.params['id'];
    this.dishservice.getDishIds().subscribe(ids=>this.dishids=ids);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    
  }

  setPrevNext(id:number){
    let idindex=this.dishids.indexOf(id);
    this.prev=(this.dishids.length+idindex-1)%(this.dishids.length);
    this.next=(this.dishids.length+idindex+1)%(this.dishids.length);
    console.log(this.prev,this.next);
  }

  goBack():void{
    this.location.back();
  }

}
