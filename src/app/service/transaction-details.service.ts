import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction-details';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionDetailsService {

  constructor(private httpclient:HttpClient) { }
  baseurl="http://localhost:5287/api/Transactions";

  GetTransaction(): Observable<Transaction[]> {
    return this.httpclient.get<Transaction[]>(this.baseurl);
  }
}
