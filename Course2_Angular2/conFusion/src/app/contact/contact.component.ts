import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';
import { flyInOut,expand,displayInDOM } from '../animations/app.animation';
import {FeedbackService} from '../services/feedback.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),expand(),displayInDOM()
    ]
})
export class ContactComponent implements OnInit {
  feedbackForm:FormGroup;
  feedback:Feedback;
  contactTypes=ContactType;
  hideStatus='displayed';
  spiningVisibility='notdisplayed';
  displayDataVisibility='notdisplayed';
  postedFeedack:Feedback;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  constructor(private fb:FormBuilder, private feedBackService:FeedbackService) { 
    this.createForm();
    console.log(this.displayDataVisibility);

  }

  ngOnInit() {
  }
createForm(){
  this.feedbackForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    telnum: ['', [Validators.required, Validators.pattern] ],
    email: ['', [Validators.required, Validators.email] ],
    agree: false,
    contacttype: 'None',
    message: ''
  });
  this.feedbackForm.valueChanges
      .subscribe(() => this.onValueChanged());

    this.onValueChanged();
}

onValueChanged(data?: any) {
  if (!this.feedbackForm) { return; }
  const form = this.feedbackForm;
  for (const field in this.formErrors) {
    // clear previous error message (if any)
    this.formErrors[field] = '';
    const control = form.get(field);
    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        this.formErrors[field] += messages[key] + ' ';
      }
    }
  }
}

onSubmit():void{
console.log("feedback form Submitted",this.feedbackForm.value);
this.feedback=this.feedbackForm.value;
this.hideStatus='notdisplayed';
this.feedbackForm.reset({
  firstname:'',
    lastname:'',
    telnum:'',
    email:'',
    agree:false,
    contacttype:'None',
    message:''
});
this.spiningVisibility='displayed';


this.feedBackService.submitFeedback(this.feedback).subscribe((fb)=>{
  this.spiningVisibility='notdisplayed';
  this.postedFeedack=fb;
  this.displayDataVisibility='displayed';
  setTimeout(()=>{this.displayDataVisibility='notdisplayed';this.postedFeedack=null;
  this.hideStatus='displayed';},5000);


}); // In the subscribe, this.spiningVisibility='notdisplayed';display the information and setTimeout after which hide the details and show the form  

}

}
