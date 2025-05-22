import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction-details';
import { Observable } from 'rxjs';

//this service connects the angular frontend to the backend api
@Injectable({
  providedIn: 'root'//making this service available application wide
})
export class TransactionDetailsService {

  constructor(private httpclient:HttpClient) { }
  baseurl="http://localhost:5287/api/Transactions";

  GetTransaction(): Observable<Transaction[]> {
    return this.httpclient.get<Transaction[]>(this.baseurl);
  }

  insertTransaction(transaction: Transaction): Observable<Transaction> {
    return this.httpclient.post<Transaction>(this.baseurl, transaction);
  }

  updateTransaction(id: number, transaction: Transaction): Observable<Transaction> {
    return this.httpclient.put<Transaction>(`${this.baseurl}/${id}`, transaction);
  }
  
  deleteTransaction(id: number): Observable<any> {
    return this.httpclient.delete(`${this.baseurl}/${id}`);
  }

  //Observable = “Data is coming soon”
//subscribe() = “Here’s what to do when it arrives”
  
}
