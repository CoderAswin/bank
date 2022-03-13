import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  username:any
  currentAcno:any
  database: any = {
    1000: { acno: 1000, uname: 'aswin', password: 1000, balance: 5000,transaction:[] },
    1002: { acno: 1001, uname: 'sreehari', password: 1002, balance: 5000,transaction:[] },
    1003: { acno: 1002, uname: 'ameen', password: 1003, balance: 5000,transaction:[] },
  };
  constructor() {
    this.getData()
   }


  storeData(){
    localStorage.setItem("databaseNew",JSON.stringify(this.database))
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
    if(this.username){
      localStorage.setItem("currentUsername",JSON.stringify(this.username))
    }
  }

  getData(){
    if(localStorage.getItem('databaseNew')){
      this.database = JSON.parse(localStorage.getItem("databaseNew") || '')
    }
    if(localStorage.getItem('currentAcno')){
      this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '')
    }
    if(localStorage.getItem('currentUsername')){
      this.username = JSON.parse(localStorage.getItem('currentUsername') || '')
    }
    
  }

  register(acno: any, uname: any, password: any) {
    let database = this.database;
    if (acno in database) {
      return false;
    } else {
      database[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction:[]
      };
      this.storeData()
      return true;
    }
  }

  login(acno: any, password: any) {
    let database = this.database;
    if (acno in database) {
      if (password == database[acno].password) {
        this.currentAcno = acno
        this.username = database[acno].uname
        this.storeData()
        return true;
      } else {
        alert('Incorrect Password');
        return false;
      }
    } else {
      alert('user doesnot exist');
      return false;
    }
  }


  deposit(acno: any, password: any, DepAmount: any) {
    var amount = parseInt(DepAmount)
    let database = this.database
    if (acno in database) {
      if (password == database[acno].password) {
        database[acno].balance += amount
        database[acno].transaction.push({
          amount:amount,
          type:'CREDIT'
        })
        return database[acno].balance
      } else {
        alert('incorrect password')
        return false
      }
    } else {
      alert('user doesnot exists')
      return false
    }
  }

  withdraw(wacno: any, Wpassword: any, wAmount: any) {
    var amount = parseInt(wAmount)
    let database = this.database
    if (wacno in database) {
      if (Wpassword == database[wacno].password) {
        if (database[wacno].balance > amount) {
          database[wacno].balance -= amount
          database[wacno].transaction.push({
            amount:amount,
            type:'DEBIT'
          })
          return database[wacno].balance
        }else {
          alert('insufficient balance')
          return false
        }
      } else {
        alert('incorrect password')
        return false
      }
    }else{
      alert("user doesnot exist!!!")
      return false
    } 
  }

  getTransaction(acno:any){
    return this.database[acno].transaction
  }
}
