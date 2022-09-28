import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // type: string = 'password';
  // isText: boolean = false;
  // eyeIcon: string = 'fa fa-eye-slash';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClickLogin() {
    this.router.navigate(['/login']);
  }

  onClickSignup() {
    this.router.navigate(['/signup']);
  }
}

// hideShowpass() {
//   this.isText = !this.isText;
//   this.isText
//     ? (this.eyeIcon = 'fa fa-eye')
//     : (this.eyeIcon = 'fa fa-eye-slash');
//   this.isText ? (this.type = 'text') : (this.type = 'password');
// }
