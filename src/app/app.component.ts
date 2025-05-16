import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InsertTransactionComponent } from './insert-transaction/insert-transaction.component';
import { TransactionDetailsService } from './service/transaction-details.service';
import { HttpClientModule } from '@angular/common/http';
import { Transaction } from './models/transaction-details';  // <-- import interface

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    InsertTransactionComponent,
  ],
  providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() transactionary: Transaction[] = [];  // <-- added this

  constructor(private transerve: TransactionDetailsService) {}

  ngOnInit(): void {
    this.transerve.GetTransaction().subscribe({
      next: (response) => {
        console.log(response); 
        if (response && response.length > 0) {
          this.transactionary = response;  
        } else {
          this.transactionary = []; 
        }
      },
      error: (err) => console.error('API error:', err)
    });
  }

  getTransactions(): void {
    this.transerve.GetTransaction().subscribe({
      next: (data) => {
        this.transactionary = [...data];
        console.log('Fetched Transactions:', this.transactionary);  
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
      }
    });
  }

  
  title = 'expenseTrackerapp';
}
