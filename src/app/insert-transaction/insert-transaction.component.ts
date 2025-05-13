import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insert-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './insert-transaction.component.html',
  styleUrls: ['./insert-transaction.component.css']
})
export class InsertTransactionComponent {
  years: number[] = [2023, 2024, 2025];
  months: string[] = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  transaction = {
    year: 2025,
    month: 'April',
    date: 1,
    description: '',
    amount: 0,
    type: 'Debit'
  };

  insertTransaction() {
    console.log('Inserted Transaction:', this.transaction);
    alert('Transaction details have been successfully updated!');
    
  }
}
