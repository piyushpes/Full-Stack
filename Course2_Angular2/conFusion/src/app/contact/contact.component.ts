import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  feedbackForm:FormGroup;
  feedback:Feedback;
  contactTypes=ContactType;
  constructor(private fb:FormBuilder) { 
    this.createForm();

  }

  ngOnInit() {
  }
createForm(){
  this.feedbackForm=this.fb.group({
    firstname:['',Validators.required],
    lastname:['',Validators.required],
    telnum:['',Validators.required],
    email:['',Validators.required],
    agree:false,
    contacttype:'None',
    message:''
  });
}

onSubmit():void{
console.log("feedback form Submitted",this.feedbackForm.value);
this.feedback=this.feedbackForm.value;
this.feedbackForm.reset({
  firstname:'',
    lastname:'',
    telnum:'',
    email:'',
    agree:false,
    contacttype:'None',
    message:''
});
}

}
