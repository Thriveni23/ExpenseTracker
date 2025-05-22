import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionDetailsService } from './service/transaction-details.service';
import { HttpClientModule } from '@angular/common/http';
import { Transaction } from './models/transaction-details';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  //providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   transactionary: Transaction[] = [];  

  constructor(private transerve: TransactionDetailsService) {}

  ngOnInit(): void {//automatically called when initialising the component
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
  }//calls to get the transaction data from backend right when the app loads

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
  }//gets the transaction data from backend when the manually triggered 

  
  title = 'expenseTrackerapp';
}
//placeholder that renders component based on routes