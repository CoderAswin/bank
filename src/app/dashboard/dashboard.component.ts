import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // acno = '';
  // password = '';
  // DepAmount = ''
  // wacno = '';
  // Wpassword = '';
  // wAmount = '';
  username:any
  ldate:any
  acno:any

  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    DepAmount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })


  withdrawForm = this.fb.group({
    wacno:['',[Validators.required, Validators.pattern('[0-9]*')]],
    Wpassword:['',[Validators.required, Validators.pattern('[0-9]*')]],
    wAmount:['',[Validators.required, Validators.pattern('[0-9]*')]]
  })

  constructor(private ds: DataService, private fb: FormBuilder,private router:Router) {
    this.username = this.ds.username
    this.ldate = new Date()
   }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("please Log In")
      this.router.navigateByUrl('')
    }
  }

  deposit() {
    var acno = this.depositForm.value.acno
    var password = this.depositForm.value.password
    var DepAmount = this.depositForm.value.DepAmount
    if (this.depositForm.valid) {
      const result = this.ds.deposit(acno, password, DepAmount)
      if (result) {
        alert(DepAmount + 'successfully deposit...And new balance is' + result)
      }
    }

  }
  withdraw() {
    var wacno = this.withdrawForm.value.wacno
    var Wpassword = this.withdrawForm.value.Wpassword
    var wAmount = this.withdrawForm.value.wAmount
    if (this.withdrawForm.valid) {
      const result = this.ds.withdraw(wacno, Wpassword, wAmount)
      if (result) {
        alert(wAmount + 'successfully debited...And new balance is' + result)
      }
    }

  }

  logout(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUsername")
    this.router.navigateByUrl('')
  }

  deleteAccount(){
    this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
  }

  cancel(){
    this.acno = ""
  }

  Delete(event:any){
    alert("delete Account" + event + "from parent")
    this.router.navigateByUrl("")
  }
}
