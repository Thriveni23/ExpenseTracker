import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InsertTransactionComponent } from './insert-transaction/insert-transaction.component';
import { TransactionDetailsService } from './service/transaction-details.service';

import { HttpClient } from '@angular/common/http';      


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    InsertTransactionComponent,
    HttpClient // ✅ Add this here
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private transerve: TransactionDetailsService) {}

  ngOnInit(): void {
    this.transerve.GetTransaction().subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error('API error:', err)
    });
  }

  title = 'expenseTrackerapp';
}
