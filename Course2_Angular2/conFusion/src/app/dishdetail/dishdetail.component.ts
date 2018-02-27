import { Component, OnInit, Input } from '@angular/core';
import {Dish} from '../shared/dish';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import 'rxjs/add/operator/switchMap';
import {FormBuilder,FormGroup,Validators, RequiredValidator} from '@angular/forms';
import {Comment} from '../shared/comment';

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
  comment:Comment={rating:5,comment:'',author:'',date:''};

  userCommentFormErrors={
    'author':'',
    'comment':''
  };

  errorMessages={
    'author':{'required':"Name is required",
              'minlength':"Name should be of minimum 2 characters"},
    'comment':{'required':"Comment is required"}
  };

  userCommentForm:FormGroup;
  constructor(private dishservice:DishService, private location:Location,private route:ActivatedRoute,private fb:FormBuilder) { 
    this.createForm();
  }

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
    //console.log(this.prev,this.next);
  }

  goBack():void{
    this.location.back();
  }

  createForm(){
    this.userCommentForm=this.fb.group({
      'author':['',[Validators.required,Validators.minLength(2)]],
      'comment':['',[Validators.required]],
      'rating': 5,
      'date':''
    });
    this.userCommentForm.valueChanges.subscribe(()=>this.OnValueChanged())
  }
  onSubmit(){
    

    this.comment.date=(new Date).toISOString();

    this.dish.comments.push(this.comment);
    this.comment={rating:5,comment:'',author:'',date:''};
    this.userCommentForm.reset({
      'author':'',
      'comment':'',
      'rating': 5,
      'date':'' 
    });
  }
  OnValueChanged(){
    
    if(!this.userCommentForm){
      return;
    }
    //console.log(this.userCommentForm.get('rating').value);
    for(let prop in this.comment){
      if(this.userCommentForm.get(prop))
      this.comment[prop]=this.userCommentForm.get(prop).value
    }
    console.log(this.comment); 
    let errorObj;
    
    for( let field in this.userCommentFormErrors){
      this.userCommentFormErrors[field]="";
      if(this.userCommentForm && this.userCommentForm.dirty && this.userCommentForm.invalid)
      {
      errorObj=this.userCommentForm.get(field).errors;
      for(let err in errorObj){
        this.userCommentFormErrors[field]+= this.errorMessages[field][err] + ' ';
      }
    }
    }


  }

}
