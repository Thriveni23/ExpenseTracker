import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../models/transaction-details';
import { TransactionDetailsService } from '../service/transaction-details.service';

@Component({
  selector: 'app-insert-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], 
  templateUrl: './insert-transaction.component.html',
  styleUrls: ['./insert-transaction.component.css']
})
export class InsertTransactionComponent {
  @Input() transactionary: Transaction[] = [];
  transactionForm!: FormGroup;
  years: number[] = [2023, 2024, 2025];
  months: string[] = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  transactionToEdit: Transaction | null = null;  // Add this line to track the transaction being edited

  constructor(
    private fb: FormBuilder,
    private transerve: TransactionDetailsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getTransactions();  
  }

  initializeForm(): void {
    this.transactionForm = this.fb.group({
      year: [2025, Validators.required],      
      month: ['April', Validators.required],   
      date: [1, [Validators.required, Validators.min(1)]],  
      description: ['', Validators.required],  
      amount: [0, [Validators.required, Validators.min(0)]],  
      type: ['Debit', Validators.required]     
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

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;
  
      if (this.transactionToEdit) {
        // ✅ Include the ID explicitly in the updated transaction
        const updatedTransaction: Transaction = {
          id: this.transactionToEdit.id,
          ...formValue
        };
  
        this.transerve.updateTransaction(this.transactionToEdit.id, updatedTransaction).subscribe({
          next: (response) => {
            console.log('Transaction updated successfully', response);
            alert('SUCCESSFULLY UPDATED!!');
            this.getTransactions();
            this.transactionForm.reset();
            this.transactionToEdit = null;
          },
          error: (err) => {
            console.error('Error updating transaction:', err);
            alert('Failed to update transaction.');
          }
        });
      } else {
        // Insert new transaction
        const newTransaction: Transaction = formValue;
        this.transerve.insertTransaction(newTransaction).subscribe({
          next: (response) => {
            console.log('Transaction inserted successfully', response);
            alert('Transaction has been added successfully!');
            this.getTransactions();
            this.transactionForm.reset();
          },
          error: (err) => {
            console.error('Error inserting transaction:', err);
            alert('Failed to add transaction.');
          }
        });
      }
    } else {
      console.log('Form is invalid');
      alert('Please fill in all fields correctly.');
    }
  }
  
  onEdit(transaction: Transaction): void {
    this.transactionToEdit = { ...transaction }; 
    // Populate form with the selected transaction's data
    this.transactionForm.setValue({
      year: transaction.year,
      month: transaction.month,
      date: transaction.date,
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type
    });
    this.transactionToEdit = transaction;  // Set transaction to edit
  }

  onDelete(transaction: Transaction): void {
    console.log('Deleting transaction with ID:', transaction.id);
    this.transerve.deleteTransaction(transaction.id).subscribe({
      next: (response) => {
        console.log('Transaction deleted successfully', response); 
        alert('SUCCESSFULLY DELETED!');
        this.getTransactions();
      },
      error: (err) => {
        console.error('Error deleting transaction:', err);
        alert('Failed to delete transaction.');
      }
    });
  }
}
