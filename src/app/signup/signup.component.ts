import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        fname: ['', [Validators.required]],
        femail: ['', [Validators.required, Validators.email]],
        fpassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      (err: string | number) => {
        console.log('Some Error occured', +err);
      }
    );
  }

  signUp() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.http
        .post<any>(
          'https://libraryappback.herokuapp.com/users',
          this.signupForm.value
        )
        .subscribe((res) => {
          console.log(res);
          alert('Signup successfull');
          this.router.navigate(['/login']);
        });
    } else {
      alert('Please enter valid credentials');
    }
  }

  onClickLogin() {
    this.router.navigate(['/login']);
  }
}
