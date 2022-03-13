import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // acno='';
  // uname='';
  // password='';


  registerForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
   var acno= this.registerForm.value.acno
   var uname= this.registerForm.value.uname
   var password = this.registerForm.value.password
   
   if(this.registerForm.valid){
    const result = this.ds.register(acno,uname,password)
    if(result){
      alert("success");
       this.router.navigateByUrl("");
    }
    else
    {
      alert("already exist!!");
    }
   }else{
     alert('invalid password')
   }
    
  
  }

}
