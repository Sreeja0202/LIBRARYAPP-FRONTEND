import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // type: string = 'password';
  // isText: boolean = false;
  // eyeIcon: string = 'fa fa-eye-slash';

  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        femail: ['', [Validators.required, Validators.email]],
        fpassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      (err: string | number) => {
        console.log('Some Error Occured', +err);
      }
    );
  }

  onClickSignup() {
    this.router.navigate(['/signup']);
  }

  logIn() {
    if (this.loginForm.valid) {
      this.http
        .get<any>('https://libraryappback.herokuapp.com/users')
        .subscribe(
          (res) => {
            const user = res.find((a: any) => {
              console.log(a);
              console.log(this.loginForm.value.femail);
              return (
                a.femail === this.loginForm.value.femail &&
                a.fpassword === this.loginForm.value.fpassword
              );
            });
            if (user) {
              alert('Login Successfull!!!');
              this.loginForm.reset();
              this.router.navigate(['/viewbooks']);
            } else {
              alert('User not Found');
            }
          },
          (err) => {
            alert('Some error occured');
            console.log(err);
          }
        );
    } else {
      alert('Please enter valid login  credentials');
    }
  }
}
