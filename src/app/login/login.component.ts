import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // aim = `Perfect Banking Partner`;
  // accno = 'Enter account number';
  // acno = '';
  // password = '';



  loginForm = this.fb.group({
    acno: ['',[Validators.required,Validators.pattern('[0-9 ]*')]],
    password: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void { }

  login() {
    var acno = this.loginForm.value.acno;
    var pwsd = this.loginForm.value.password;
    if (this.loginForm.valid) {
      const result = this.ds.login(acno, pwsd)
      if (result) {
        alert("Login Successfully")
        this.router.navigateByUrl("dashboard")
      }
    }else{
      alert('invalid credentials')
    }
  }
}


//login using template variable referncesing
  // login(a:any,b:any) {
  //   var acno = a.value;
  //   var pwsd = b.value;
  //   let database = this.database;
  //   if (acno in database) {
  //     if (pwsd == database[acno].password) {
  //       alert('login success!!!');
  //     } else {
  //       alert('incorrect password !!!');
  //     }
  //   }
  //   else{
  //     alert("user doesnot exist!!!")
  //   }
  // }
  //onchange function model base don event


  // database:any = {
  //   1000: { acno: 1000, uname: 'muhasin', password: 123, balance: 5000 },
  //   1002: { acno: 1001, uname: 'shyam', password: 1234, balance: 5000 },
  //   1003: { acno: 1002, uname: 'yasin', password: 1235, balance: 5000 },
  // };
