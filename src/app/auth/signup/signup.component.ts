import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      alert('Please fill in all fields correctly.');
      return;
    }

    this.authService.register(this.signupForm.value).subscribe({
      next: () => {
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Signup error:', err);
        alert('Signup failed: ' + (err.error?.title || 'Try again'));
      }
    });
  }
}
